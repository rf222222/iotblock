var facts = [];

function log(msg) {
    var log = $('#log');
    log.append(msg + "<br/>\n");
    log.scrollTo('100%');
}


function parseLinks() {
    var url=site_url + '/cat'
        
    //alert(url);
    fetch(url, $('#key').val(), function(err, doc, location) {
        var urls=[url];
    
        try {
            for (var i=0;i<doc.items.length;i++) {
                var item = doc.items[i];
                item.href = URI(item.href).absoluteTo(url).toString();    // fixup relative URL
                urls.push(item.href);
            }
            populateUrls(urls);
            $('#urls').trigger('change');

        } catch(e) {
            log(e);
        }
        
    });
}

function populateUrls(urls) {

    $("#urls").find('option').remove().end();
    
    for (var i=0; i < urls.length; i++) {
        $("#urls").append(new Option(urls[i], urls[i]));
    }
    $("#urls").append(new Option(site_url + '/cat', site_url + '/cat'));

}


function del(url, key, cb) {
    log('-> DELETE ' + url);
    $.ajax({
        beforeSend: function(xhr){
            if (key !== "")
                xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(key + ':'));
        },
        type: 'DELETE',
        url: '/del?url='+encodeURI(url),
        dataType: 'json',
        success: function(body, textStatus, xhr) {
            log('<- ' + xhr.status + ' ' + xhr.statusText);
            cb(null, body);
        },
        error: function(xhr, textStatus) {
            log('<- ' + xhr.status + ' ' + xhr.statusText);
            if (xhr.status == 200)
                cb(null, null);
        }
    });
}


function fetch(url, key, cb) {
    log('-> GET ' + url);
    $.ajax({
        beforeSend: function(xhr){
            if (key !== "")
                xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(key + ':'));
        },
        type: 'GET',
        url: '/cat/get?href='+encodeURIComponent(url),
        dataType: 'json',
        success: function(body, textStatus, xhr) {
            log('<- ' + xhr.status + ' ' + xhr.statusText);
            cb(null, body, url); //xhr.getResponseHeader('Location'));
        },
        error: function(xhr, textStatus) {
            log('<- Error ' + xhr.status + ' ' + xhr.statusText);
        }
    });
}

function storeFact(o) {
    // only store unique facts (FIXME, slow)
    for (var i=0;i<facts.length;i++) {
        if (facts[i].subject == o.subject &&
            facts[i].predicate == o.predicate &&
            facts[i].object == o.object)
                return;
    }
    facts.push(o);
}

function ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}


function isConnected(from, to) {  // one hop
    if (from == to)
        return true;
    for (var i=0;i<facts.length;i++) {
        if (facts[i].subject == from &&
            facts[i].object == to)
            return true;
        if (facts[i].subject == to &&
            facts[i].object == from)
            return true;
    }
    return false;
}

// Look away now Mr. Dijkstra
function reachable(from, to, maxHops) {
    if (isConnected(from, to))
        return true;
    if (maxHops == 0)
        return false;

    var neighbours = [];
    for (var i=0;i<facts.length;i++) {
        if (isConnected(from, facts[i].subject))
            neighbours.push(facts[i].subject);
    }
    neighbours = ArrNoDupe(neighbours);
    for (var i=0;i<neighbours.length;i++) {
        if (reachable(neighbours[i], to, maxHops-1))
            return true;
    }
    return false;
}


// http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
function getQueryVariable(variable) {
var query = window.location.search.substring(1);
var vars = query.split('&');
for (var i = 0; i < vars.length; i++) {
var pair = vars[i].split('=');
if (decodeURIComponent(pair[0]) == variable) {
return decodeURIComponent(pair[1]);
}
}
}


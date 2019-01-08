var map = function() {
	var sentence = this.content;
	var result=sentence.split(".");
	var scount=result.length;
	var totalwords=0;
	for (var i=0; i<scount;i++)
	{
	var words=result[i].split(" ");
	var wcount=words.length;
	totalwords+=wcount;
	}
	var avwc=totalwords/scount;
	emit({ sentences: scount }, { count: 1,ave:avwc });
}

var reduce=function(key, values,ave) {
	var total = 0;
	var avtotal=0;
	for(var i = 0; i < values.length; i++) {
		total += values[i].count;
		avtotal += values[i].ave;
	}
	return {count: total,ave:avtotal/total };
}

results = db.runCommand({
mapReduce: 'articles',
map: map,
reduce: reduce,
out: 'articles.report'
});
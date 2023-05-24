function s(o) {
    var r = [];
    for (var i = 0; i < o.length; i++) {
        var g = 0;
        for (var j = 0; j < o[i].grades.length; j++) {
            g += o[i].grades[j];
        }
        g = g / o[i].grades.length;
        var a = o[i].attendance / (o[i].attendance + o[i].absences);
        if (o[i].age >= 18 && g >= 85 && a >= 0.9) {
            r.push(o[i]);
        }
    }
    return r;
}
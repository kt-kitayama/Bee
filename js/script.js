var t_std = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
});

var t_pale = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
});

var t_ort = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg', {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
});

var t_flw = new L.vectorGrid.protobuf("https://kt-kitayama.github.io/BuzzMap/Flw/{z}/{x}/{y}.mvt", {
    attribution: "<a href='https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A45.html' target='_blank'>林野庁・秋田県</a>",
    maxNativeZoom: 14,
    minNativeZoom: 14,
    maxZoom: 18,
    rendererFactory: L.canvas.tile,
    vectorTileLayerStyles: {
        "AkitaBee(樹種のみ蜜源)": {
            color: "red",
            weight: 2
        }
    }
});


var Map_b = {
    "地理院地図 標準": t_std,
    "地理院地図 淡色": t_pale,
    "地理院地図 オルソ": t_ort,
    "ふらわ": t_flw,
};

var map = L.map('map', {
    center: [40.3468161, 140.8365573],
    zoom: 14,
    layers: [t_pale]
});

L.control.scale({ maxWidth: 250, imperial: false }).addTo(map);

L.control.layers(Map_b, null, { collapsed: false }).addTo(map);

// singleclick（mapに設定）
map.options.singleClickTimeout = 250;
map.on('singleclick', function (e) {
    L.popup().setLatLng(e.latlng)
        .setContent('<b> 番号：</b><input type="text" name="name" size="30" maxlength="20"></br><input type="submit" value="ここに巣箱を設置">')
        .openOn(map);
});

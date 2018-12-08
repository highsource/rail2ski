function custom_railway(layer, json){

  $.ajax({
    url: json
  }).then(function(streckennetz_json) {
    var lines = typeof streckennetz_json == 'string' ? JSON.parse(streckennetz_json) : streckennetz_json;
    layer.addLayer(
      L.geoJson(lines, {
        style: function (feature) {
          return {color: 'black', weight:2, opacity: 1};
            }
      }));
    layer.addLayer(
      L.geoJson(lines, {
        style: function (feature) {
          return {color: 'white', weight:1, opacity: 1, dashArray : '3, 3'};
            }
      }));
  });

};


function custom_ski_cluster(cluster, json){

  $.getJSON(json, function(skigebiete_json) {
    var features = (typeof skigebiete_json == 'string' ? JSON.parse(skigebiete_json) : skigebiete_json).features;
    for (var index = 0; index < features.length; index++)
    {
      var feature = features[index];
      if (feature.geometry)
      {
        var popupText = "<a href=\"" + feature.properties.url + "\" target=\"skigebiet\">" + feature.properties.name + "</a>";
        var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {title: feature.properties.name})
          .bindPopup(popupText)
          .bindTooltip(feature.properties.name, {permanent: true, opacity: 0.8}).openTooltip();
        cluster.addLayer(marker);
      }
    }
  });

}

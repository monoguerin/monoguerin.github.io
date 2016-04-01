var directionsService,directionsDisplay;

function initMap() {
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);
}

function calculateAndDisplayRoute(waypoints) {

    var startPoint = "Dadeland Mall, Miami";
    var waypts = waypoints || [];
    var endpoint = waypoints.pop().location;

    directionsService.route({
        origin: startPoint,
        destination: endpoint,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            console.log(response);
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            console.log(route.legs.length);
            var stopTime = document.getElementById("stop-value").value * 60;
            var totalTime = 0;
            var totalDistance = 0;
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += '<b>from: </b>'+route.legs[i].start_address + '<br>';
                summaryPanel.innerHTML += '<b>to: </b>'+route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += '<b>distance: </b>' + route.legs[i].distance.text + '<br>';
                summaryPanel.innerHTML += '<b>duration: </b>' + route.legs[i].duration.text + '<br><br>';
                totalTime += route.legs[i].duration.value + stopTime;
                totalDistance += route.legs[i].distance.value;
            }
            summaryPanel.innerHTML += '<b>Total Time: </b>' + Math.round(totalTime/60) + ' mins<br>';
            summaryPanel.innerHTML += '<b>Total Distance: </b>' + Math.round(totalDistance*0.000621371) + ' mi<br><br><br>';

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

var tracedRoutes = [];

$(document).ready(function () {
    $.get("csv/map.csv", function(response) {
        var logfile = response;
        console.log(logfile);
        var mapDirections = $.csv.toObjects(logfile);
        console.log(mapDirections);

        $.each(mapDirections, function( index, valObject ) {
            console.log("index", index);
            console.log("value", valObject);

            var newIndex = valObject.RouteNo-1;
            tracedRoutes[newIndex] = tracedRoutes[newIndex] || {};
            tracedRoutes[newIndex][valObject.RouteStopNo] = tracedRoutes[newIndex][valObject.RouteStopNo] || {};
            tracedRoutes[newIndex][valObject.RouteStopNo].location = valObject.Delivery_Latitude + "," + valObject.Delivery_Longitude;
            tracedRoutes[newIndex][valObject.RouteStopNo].stopover = true;
        });

        console.log(tracedRoutes);
        $.each(tracedRoutes, function(index, value) {
            $("#routes").append("<option value=" + index + ">Route #" + (index+1) +"</option>");
        });

        $("#routes, #stop-value").change(function () {
            var routeSelected = $("#routes").val();

            if(!routeSelected) return;

            var array = $.map(tracedRoutes[routeSelected], function(value, index) {
                return [value];
            });

            calculateAndDisplayRoute(array);


        });
    });
});


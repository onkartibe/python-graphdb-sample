var labelType, useGradients, nativeTextSupport, animate;
url_map = {
    '0':'country_data/',
    '1':'product_data/',
    '2':'adv_data/',
    '3':'adv_data_data/'
};

(function() {
    data = {
        country_id : 2509,
        csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val()
    }
    var csrftoken = getCookie('csrftoken');
    $.ajax({
      type: 'POST',
      url: '/',
      data: JSON.stringify(data),
      beforeSend: function(xhr, settings){
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
      success: function(data) {
        console.log(data);
        $('#eachnode-details').empty();
        $('#eachnode-head').empty();
        $('#eachnode-head').append("Node Name "+"Not Implemeneted"+"<br>");
        $('#eachnode-head').append('Node Type'+ " : " + "CountryData"+"<br>");
        $('#eachnode-details').append('Product Count'+ " : " + data['product_count'] +"<br>");
      }
    });

    var ua = navigator.userAgent,
        iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
        typeOfCanvas = typeof HTMLCanvasElement,
        nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
        textSupport = nativeCanvasSupport && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
    //I'm setting this based on the fact that ExCanvas provides text support for IE
    //and that as of today iPhone/iPad current text support is lame
    labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
    nativeTextSupport = labelType == 'Native';
    useGradients = nativeCanvasSupport;
    animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
    elem: false,
    write: function(text) {
        if (!this.elem)
            this.elem = document.getElementById('log');
        this.elem.innerHTML = text;
        this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
    }
};

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function init() {
    //init data
    var json = {
        id: "2509",
        name: "US",
        children: [{
            id: "2044",
            name: "US &amp;Chevrolet",
            data: {
                type:"1",
                relation: "<h4>US &amp; Chevrolet</h4><b>Connections:</b><ul><li>US <div>(relation: has)</div></li><li>Chevrolet <div>(relation: has)</div></li></ul>"
            },
            children: [{
                id: "2925",
                name: "Chevrolet",
                data: {
                    type:"2",
                    relation: "<h4>Chevrolet</h4><b>Connections:</b><ul><li>US &amp; Chevrolet <div>(relation: has)</div></li></ul>"
                },
                children: []
            }]
            }, {
            id: "107877_3",
            name: "FORD &amp; US",
            data: {
                relation: "<h4>FORD &amp; US</h4><b>Connections:</b><ul><li>US <div>(relation: has)</div></li><li>FORD <div>(relation: has)</div></li></ul>"
            },
            children: [{
                id: "964_4",
                name: "FORD",
                data: {
                    relation: "<h4>FORD</h4><b>Connections:</b><ul><li>FORD &amp; US <div>(relation: has)</div></li></ul>"
                },
                children: []
            }]
            }, {
            id: "236797_5",
            name: "HYUNDAI",
            data: {
                relation: "<h4>HYUNDAI</h4><b>Connections:</b><ul><li>US <div>(relation: advertise_by)</div></li><li>GENERAL MOTORS <div>(relation: advertise_by)</div></li><li>ADV1 <div>(relation: advertise_by)</div></li><li>ADV2 <div>(relation: advertise_by)</div></li><li>ADV3 <div>(relation: has)</div></li><li>ADV4 <div>(relation: advertise_by)</div></li><li>ADV5 <div>(relation: advertise_by)</div></li></ul>"
            },
            children: [{
                id: "1756_6",
                name: "GENERAL MOTORS",
                data: {
                    relation: "<h4>GENERAL MOTORS</h4><b>Connections:</b><ul><li>HYUNDAI <div>(relation: advertise_by)</div></li></ul>"
                },
                children: [{
                    id: "14581_7",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>HYUNDAI <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "50188_8",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>HYUNDAI <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "65452_9",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>HYUNDAI <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "115632_10",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV4</h4><b>Connections:</b><ul><li>HYUNDAI <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "346850_11",
                    name: "ADV5",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>HYUNDAI <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }]
            }]
        }, {
            id: "41529_12",
            name: "CHERY",
            data: {
                relation: "<h4>CHERY</h4><b>Connections:</b><ul><li>US <div>(relation: advertise_by)</div></li><li>CHERY SOCMA SA <div>(relation: advertise_by)</div></li><li>ADV1 <div>(relation: advertise_by)</div></li><li>Brad <div>(relation: advertise_by)</div></li><li>ADV2 <div>(relation: advertise_by)</div></li><li>ADV5 <div>(relation: advertise_by)</div></li></ul>"
            },
            children: [{
                id: "1756_13",
                name: "CHERY SOCMA SA",
                data: {
                    relation: "<h4>CHERY SOCMA SAS</h4><b>Connections:</b><ul><li>CHERY<div>(relation: advertise_by)</div></li></ul>"
                },
                children: [{
                    id: "14581_14",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: advertise_by)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "24119_15",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: advertise_by)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "50188_16",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: advertise_by)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "346850_17",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: advertise_by)</div></li></ul>"
                    },
                    children: []
                }]
            }]
        }, {
            id: "131161_18",
            name: "SMART/AUTO",
            data: {
                relation: "<h4>SMART/AUTO</h4><b>Connections:</b><ul>SMART/AUTO<li>US <div>(relation: advertise_by)</div></li><li><div>(relation: advertise_by)</div></li><li>SMART/AUTO &amp; Zeke <div>(relation: has)</div></li><li>GRUPO AUTOLIDER <div>(relation: advertise_by)</div></li><li>Beck &amp; SMART/AUTO <div>(relation: has)</div></li></ul>"
            },
            children: [{
                id: "72007_20",
                name: "SMART/AUTO &amp; Zeke",
                data: {
                    relation: "<h4>SMART/AUTO &amp; Zeke</h4><b>Connections:</b><ul><li>SMART/AUTO <div>(relation: has)</div></li></ul>"
                },
                children: [{
                    id: "14681_23",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: advertise_by)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "24819_54",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: advertise_by)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "502188_65",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "346150_54",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }]
            }, {
                id: "236657_21",
                name: "GRUPO AUTOLIDER",
                data: {
                    relation: "<h4>GRUPO AUTOLIDER</h4><b>Connections:</b><ul><li>SMART/AUTO <div>(relation: advertise_by)</div></li></ul>"
                },
                children: [{
                    id: "14587_23",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "24115_54",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "501812_65",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "346859_54",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }]
            }, {
                id: "422176_22",
                name: "Beck &amp; SMART/AUTO",
                data: {
                    relation: "<h4>Beck &amp; SMART/AUTO</h4><b>Connections:</b><ul><li>SMART/AUTO <div>(relation: has)</div></li></ul>"
                },
                children: [{
                    id: "22581_23",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "33119_54",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "44188_65",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "4546850_54",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }]
            }]
        }, {
            id: "236583_23",
            name: "CHEVROLET/SONIC AUTO",
            data: {
                relation: "<h4>CHEVROLET/SONIC AUTO</h4><b>Connections:</b><ul><li>US <div>(relation: advertise_by)</div></li><li>GENERAL MOTORS <div>(relation: advertise_by)</div></li></ul>"
            },
            children: [{
                id: "1744_29",
                name: "GENERAL MOTORS",
                data: {
                    relation: "<h4>GENERAL MOTORS</h4><b>Connections:</b><ul><li>CHEVROLET/SONIC AUTO <div>(relation: advertise_by)</div></li></ul>"
                },
                children: []
            }, {
                id: "43661_28",
                name: "CITROEN DS3",
                data: {
                    relation: "<h4>CITROEN DS3</h4><b>Connections:</b><ul><li>CHEVROLET/SONIC AUTO <div>(relation: has)</div></li></ul>"
                },
                children: [{
                    id: "14581_19",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "24119_17",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "50188_14",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "346850_13",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }]
            }]
        }, {
            id: "236585_30",
            name: "SMART/STAND",
            data: {
                relation: "<h4>SMART/STAND</h4><b>Connections:</b><ul><li>US <div>(relation: advertise_by)</div></li><li>GENERAL MOTORS <div>(relation: advertise_by)</div></li><li>CHERY SOCMA SAS <div>(relation: advertise_by)</div></li><li>Eleven <div>(relation: supporting musician)</div></li><li>Queens of the Stone Age <div>(relation: advertise_by)</div></li><li>Wellwater Conspiracy <div>(relation: advertise_by)</div></li><li>ADV3 <div>(relation: has)</div></li><li>Tone Dogs <div>(relation: advertise_by)</div></li></ul>"
            },
            children: [{
                id: "1111_31",
                name: "GENERAL MOTORS",
                data: {
                    relation: "<h4>GENERAL MOTORS</h4><b>Connections:</b><ul><li>SMART/STAND <div>(relation: advertise_by)</div></li></ul>"
                },
                children: [{
                    id: "14581_23",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "24119_54",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "50188_65",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "30_74",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }]
            }, {
                id: "1756_32",
                name: "CHERY SOCMA SAS",
                data: {
                    relation: "<h4>CHERY SOCMA SAS</h4><b>Connections:</b><ul><li>SMART/STAND <div>(relation: advertise_by)</div></li></ul>"
                },
                children: [{
                    id: "14481_23",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "243119_54",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "50288_65",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "346850_54",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }]
            }]
        }, {
            id: "236594_38",
            name: "CHERY FACE",
            data: {
                relation: "<h4>CHERY FACE</h4><b>Connections:</b><ul><li>US <div>(relation: advertise_by)</div></li><li>CHERY FACE/LUXURY <div>(relation: advertise_by)</div></li></ul>"
            },
            children: [{
                id: "2092_39",
                name: "CHERY FACE/LUXURY",
                data: {
                    relation: "<h4>CHERY FACE/LUXURY</h4><b>Connections:</b><ul><li>CHERY FACE <div>(relation: advertise_by)</div></li></ul>"
                },
                children: [{
                    id: "145481_23",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "24669_54",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "504358_65",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "3466540_54",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }]
            }]
        }, {
            id: "236022_40",
            name: "SMART LUXURY",
            data: {
                relation: "<h4>SMART LUXURY</h4><b>Connections:</b><ul><li>US <div>(relation: advertise_by)</div></li><li>GENERAL MOTORS <div>(relation: advertise_by)</div></li><li>CHEVROLET STAND <div>(relation: advertise_by)</div></li></ul>"
            },
            children: [{
                id: "543431_41",
                name: "GENERAL MOTORS",
                data: {
                    relation: "<h4>GENERAL MOTORS</h4><b>Connections:</b><ul><li>SMART LUXURY <div>(relation: advertise_by)</div></li></ul>"
                },
                children: [{
                    id: "1456431_23",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "245345_54",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "5464356_65",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "3467567_54",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: advertise_by)</div></li></ul>"
                    },
                    children: []
                }]
            }, {
                id: "92043_42",
                name: "CHEVROLET STAND",
                data: {
                    relation: "<h4>CHEVROLET STAND</h4><b>Connections:</b><ul><li>SMART LUXURY <div>(relation: advertise_by)</div></li></ul>"
                },
                children: [{
                    id: "14341_23",
                    name: "ADV1",
                    data: {
                        relation: "<h4>ADV1</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "249_54",
                    name: "ADV2",
                    data: {
                        relation: "<h4>ADV2</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "188_65",
                    name: "ADV3",
                    data: {
                        relation: "<h4>ADV3</h4><b>Connections:</b><ul><li>CHERY <div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }, {
                    id: "850_54",
                    name: "ADV4",
                    data: {
                        relation: "<h4>ADV5</h4><b>Connections:</b><ul><li>CHERY<div>(relation: has)</div></li></ul>"
                    },
                    children: []
                }]
            }]
        }],
        data: {
            type: "0",
            relation: "<h4>US</h4><b>Connections:</b><ul><li>US &amp; CHEVROLET <div>(relation: has)</div></li><li>FORD &amp; US <div>(relation: has)</div></li><li>HYUNDAI <div>(relation: has)</div></li><li>CHERY<div>(relation: has)</div></li><li>SMART/AUTO <div>(relation: has)</div></li><li>CHEVROLET/SONIC AUTO <div>(relation: has)</div></li><li>SMART/STAND <div>(relation: has)</div></li><li>CHERY FACE <div>(relation: has)</div></li><li>SMART LUXURY <div>(relation: has)</div></li></ul>"
        }
    };
    //end

    //init RGraph
    rgraph = new $jit.RGraph({
        //Where to append the visualization
        injectInto: 'infovis',
        //Optional: create a background canvas that plots
        //concentric circles.
        background: {
            CanvasStyles: {
                strokeStyle: '#555'
            }
        },
        //Add navigation capabilities:
        //zooming by scrolling and panning.
        Navigation: {
            enable: true,
            panning: true,
            zooming: 10
        },
        //Set Node and Edge styles.
        Node: {
            color: '#ddeeff'
        },

        Edge: {
            color: '#C17878',
            lineWidth: 1.5
        },

        onBeforeCompute: function(node) {
            Log.write("centering " + node.name + "...");
            //Add the relation list in the right column.
            //This list is taken from the data property of each JSON node.
            $jit.id('inner-details').innerHTML = node.data.relation;
        },

        //Add the name of the node in the correponding label
        //and a click handler to move the graph.
        //This method is called once, on label creation.
        onCreateLabel: function(domElement, node) {
            domElement.innerHTML = node.name;
            domElement.onclick = function() {
                rgraph.onClick(node.id, {
                    onComplete: function() {
                        data = {
                            node_id : node.id,
                            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val()
                        }
                        var csrftoken = getCookie('csrftoken');
                        $.ajax({
                            url: url_map[node.data.type],
                            type: 'POST',
                            data: JSON.stringify(data),
                            beforeSend: function(xhr, settings){
                                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                            },
                            success: function (data) {
                                $('#eachnode-details').empty();
                                $('#eachnode-head').empty();
                                if (node.data.type==0){
                                    $('#eachnode-head').append("Node Name "+node.name+"<br>");
                                    $('#eachnode-head').append('Node Type'+ " : " + "CountryData"+"<br>");
                                    $('#eachnode-details').append('Product Count'+ " : " + data['product_count'] +"<br>");
                                }
                                else if (node.data.type==1){
                                    $('#eachnode-head').append("Node Name  "+node.name+"<br>");
                                    $('#eachnode-head').append('Node Type'+ " : " + "ProductData"+"<br>");
                                    $('#eachnode-details').append('BrandName'+ " : " + data['product_brand_name'] +"<br>");
                                    $('#eachnode-details').append('BrandCode'+ " : " + data['product_brand_code'] +"<br>");
                                    $('#eachnode-details').append('Advertisor Count'+ " : " + data['advertisor_count'] +"<br>");
                                }
                                else if (node.data.type==2){
                                    $('#eachnode-head').append("Node Name  "+node.name+"<br>");
                                    $('#eachnode-head').append('Node Type'+ " : " + "AdvertisorData"+"<br>");
                                    $('#eachnode-details').append('Advertisor Code'+ " : " + data['advertisor_code'] +"<br>");
                                    $('#eachnode-details').append('Advertisor Name'+ " : " + data['advertisor_name'] +"<br>");
                                    $('#eachnode-details').append('Advertisment Count'+ " : " + data['advertisementdata_count'] +"<br>");
                                }
                                else{
                                    $('#eachnode-head').append("Node Name "+node.name+"<br>");
                                    $('#eachnode-head').append('Node Type'+ " : " + "AdvertismentData"+"<br>");
                                    $('#eachnode-details').append('Data Month'+ " : " + data['data_month']+"<br>");
                                    $('#eachnode-details').append('Data Factor'+ ": " + data['data_factor'] +"<br>");
                                    $('#eachnode-details').append('Currency'+ ": " + data['currency'] +"<br>");
                                    $('#eachnode-details').append('Level1 Code'+ " : " + data['level1_code'] +"<br>");
                                    $('#eachnode-details').append('Level2 Code'+ " : " + data['level2_code'] +"<br>");
                                    $('#eachnode-details').append('Level3 Code'+ " : " + data['level3_code'] +"<br>");
                                    $('#eachnode-details').append('Level3 Name'+ " : " + data['level3_name'] +"<br>");
                                }
                            }
                            });
                    }
                });
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node) {
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

            if (node._depth <= 1) {
                style.fontSize = "0.8em";
                style.color = "#ccc";

            } else if (node._depth == 2) {
                style.fontSize = "0.7em";
                style.color = "#494949";

            } else {
                style.fontSize = "0.6em";
                style.color = "#494949";
            }
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load JSON data
    rgraph.loadJSON(json);
    //trigger small animation
    rgraph.graph.eachNode(function(n) {
        var pos = n.getPos();
        pos.setc(-200, -200);
    });
    rgraph.compute('end');
    rgraph.fx.animate({
        modes: ['polar'],
        duration: 2
    });
    rgraph.refresh();


    setTimeout(function(){
        rgraph.graph.addAdjacence({  
            'id': '43661_28'  
        }, {  
            'id': '12312312'  
        }, null);
        rgraph.refresh();
        rgraph.graph.addAdjacence({  
            'id': '43661_28'  
        }, {  
            'id': '22222222'  
        }, null);
        rgraph.refresh();
    }, 3000);

    //end
    //append information about the root relations in the right column
    $jit.id('inner-details').innerHTML = rgraph.graph.getNode(rgraph.root).data.relation;
}


$('[data-toggle=tab1]').click(function(){
    $('#tab2').hide();
    $('#tab1').show();
})

$('[data-toggle=tab2]').click(function(){
    $('#tab1').hide();
    $('#tab2').show();
})

function createButtons(roadmap) {

    // get unique products from roadmap's first column
    // create product button
    var products = []; roadmap.forEach((el) => {
        if ((!products.includes(el[0])) && el[0]!='')
            products.push(el[0]);
    });

    // Construct Buttons
    document.write('<div class="btnContainer" id="myBtnContainer">');
    document.write('<button class="btn active" onclick="filterSelection(\'all\')">SHOW ALL</button><br/>\n');

    products.forEach(function(p) {
        document.write('<button class="btn" onclick="filterSelection(\''+p+'\')">'+p.toUpperCase()+'</button>\n');
    });

    document.write('</div>');

    // Add active class to the current button (highlight it)
    var btnContainer = document.getElementById("myBtnContainer");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(){
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

function toHex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

function createTimeline(tableData) {

    document.write('<div class="timeline" >');
    document.write('<div class="timelinetitle" >2018</div>');
    document.write('<button class="btn now" onclick="document.getElementById(\'now\').scrollIntoView();">Scroll To Now ⇩</button>')
    document.write('<div class="hl" style="text-align: left">JANUARY</div>');

    var i_month = 0;
    var i_day = 0;
    var currentTime = new Date();
    var side = 'right';
    var display_date;
    var current_day_bar = false;
    

    tableData.forEach(function(rowData) {

        
        if (rowData[0]!='') {

        
            var card_done = rowData[2];

            // create a hash from card description for sharing links
            var div_id = toHex(rowData[3].substring(0,3).concat(rowData[3].substr(-3)));

            // beautify date
            var pdate = new Date(rowData[1]);
            var options =  {month: 'long'};
            var card_color = '';
            var content_class = '';

            if (card_done) {
                content_class = 'content done';
                options = { day: 'numeric', month: 'long'};
                display_date = '✓ '+ pdate.toLocaleDateString("en-US",options);
                card_color = '#FFFFFF';

            } else {
                content_class = 'content todo';
                display_date = '';
                card_color = '#CCCCCC';
            }

            // escape some characters in strings to display
            var tooltip = rowData[4].replace("'","\\'");


            // if month has changed
            if (pdate.getMonth() > i_month){

                // switch side
                side = (side == 'left') ? 'right' : 'left';

                // current month's should be blue
                var color_style='';

                if (pdate.getMonth() == currentTime.getMonth()) {
                    color_style = ';color: #79bbe9;';
                    color_style = ';color: #999999;';


                }

                // draw horizontal bar + Display Month
                document.write('<div class="hl" style="text-align: '+((side == 'left') ? 'right' : 'left')+' '+color_style+'">'+pdate.toLocaleDateString("en-US",{month: 'long'})+'</div>');

                i_month = pdate.getMonth();
            }

            // draw horizontal "NOW" bar
            if ((pdate.getMonth() == currentTime.getMonth()) && (pdate.getDate() > currentTime.getDate()) && (!current_day_bar)) {
                document.write('<div id ="now" class="hl now" style=";border-top: 2px dotted #79bbe9; color: #79bbe9;">TODAY</div>');
                current_day_bar = true;
            }

            // display card

            document.write('\
      <div class="container '+ side +' filterDiv '+rowData[0]+'" \ >\
        <a href="#'+div_id+'">\
            <div id = "'+div_id+'" class= "'+content_class+'" onmouseover="Focus(this,\''+tooltip+'\',\''+side+'\',\''+card_color+'\')" onmouseleave="unFocus(this,\''+card_color+'\')" >\
           <div class="card_milestone">'+rowData[3]+'</div>\
           <div class="card_month">'+display_date+'</div>\
           <div class="card_product">'+rowData[0]+'</div>\
        </div>\
        </a>\
      </div>');

        }
    });

    document.write('</div>');
}


function Focus(obj, text, side, color) {
    obj.style['background'] = "linear-gradient(to "+side+", "+color+", white, white, white)";
    var x = document.getElementById("footer");
    x.innerHTML = "<p>"+text+"</p>";
}

function unFocus(obj, color) {
    obj.style['background-color'] = color;
    obj.style['background'] = color;

    var x = document.getElementById("footer");
    x.innerHTML = '';
}

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}


function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

window.run = function () {
    createButtons(roadmap);
    createTimeline(roadmap);
    filterSelection("all");
}
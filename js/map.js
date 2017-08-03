// ================================================== //
// Global variables
// ================================================== //

// Parameters
var parameter = 'scs_exports'; // Set initial display parameter
var year = 2016 // Set initial year
var ratData = [400, 900, 300, 600];
var newData = [800, 200, 400, 500, 100];
var barWidth = 20;
var barSpacing = 10;
var sidebarPadding = 10;

// Global variables
var circles;
var circlesObj;
var svgChart;

var map = L.map('sm-map').setView([35.707445, 8.979712], 2); // Whole Earth view
// var map = L.map('sm-map').setView([18.4438, 110.8517], 4); // SCS view

mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

// L.tileLayer(
// 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// attribution: '&copy; ' + mapLink + ' Contributors',
// maxZoom: 18,
// }).addTo(map);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1Ijoibmlja2hhcmIiLCJhIjoiY2o1YTB6a3hlMDJydjJxbzdzZXEyZjZnYyJ9.JrmS5tR6qL91DEWh0q5RAQ'
// }).addTo(map);

var myCustomStyle = {
    stroke: true,
    color: '#f0f0f0',
    weight: 2
}

var tradeData = [{"year":2016,"code":"AF","country":"Afghanistan","latitude":33.93911,"longitude":67.709953,"exports":0,"imports":64703248,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"AL","country":"Albania","latitude":41.153332,"longitude":20.168331,"exports":131845079.7,"imports":561674089,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"DZ","country":"Algeria","latitude":28.033886,"longitude":1.659626,"exports":889185004.8,"imports":9552464426,"scs_trade_percent":"0.16%"},
{"year":2016,"code":"AS","country":"American Samoa","latitude":-14.270972,"longitude":-170.132217,"exports":3189340,"imports":60454298,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"AO","country":"Angola","latitude":-11.202692,"longitude":17.873887,"exports":15367107757,"imports":2641671597,"scs_trade_percent":"0.27%"},
{"year":2016,"code":"AI","country":"Anguilla","latitude":18.220554,"longitude":-63.068615,"exports":693438,"imports":362496,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"AG","country":"Antigua and Barbuda","latitude":17.060816,"longitude":-61.796428,"exports":878064,"imports":213413541,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"AR","country":"Argentina","latitude":-38.416097,"longitude":-63.616672,"exports":9168979234,"imports":6707275196,"scs_trade_percent":"0.24%"},
{"year":2016,"code":"AM","country":"Armenia","latitude":40.069099,"longitude":45.038189,"exports":0,"imports":5791380,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"AW","country":"Aruba","latitude":12.52111,"longitude":-69.968338,"exports":5308440.98,"imports":31662102,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"AU","country":"Australia","latitude":-25.274398,"longitude":133.775136,"exports":64591693240,"imports":47225412798,"scs_trade_percent":"1.66%"},
{"year":2016,"code":"AT","country":"Austria","latitude":47.516231,"longitude":14.550072,"exports":7267054612,"imports":6342127379,"scs_trade_percent":"0.20%"},
{"year":2016,"code":"AZ","country":"Azerbaijan","latitude":40.143105,"longitude":47.576927,"exports":0,"imports":3765825,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"BS","country":"Bahamas, The","latitude":25.03428,"longitude":-77.39628,"exports":19338391.73,"imports":567185572,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"BH","country":"Bahrain","latitude":25.930414,"longitude":50.637772,"exports":470223508.9,"imports":1621037416,"scs_trade_percent":"0.03%"},
{"year":2016,"code":"BD","country":"Bangladesh","latitude":23.684994,"longitude":90.356331,"exports":8331009025,"imports":26387438014,"scs_trade_percent":"0.52%"},
{"year":2016,"code":"BB","country":"Barbados","latitude":13.193887,"longitude":-59.543198,"exports":3047451,"imports":80172254,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"BY","country":"Belarus","latitude":53.709807,"longitude":27.953389,"exports":919589327,"imports":631715326,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"BE","country":"Belgium","latitude":50.503887,"longitude":4.469936,"exports":14777073506,"imports":34539576317,"scs_trade_percent":"0.73%"},
{"year":2016,"code":"BZ","country":"Belize","latitude":17.189877,"longitude":-88.49765,"exports":4321163,"imports":20258395,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"BJ","country":"Benin","latitude":9.30769,"longitude":2.315834,"exports":485585629.3,"imports":3213968923,"scs_trade_percent":"0.05%"},
{"year":2016,"code":"BM","country":"Bermuda","latitude":32.321384,"longitude":-64.75737,"exports":1740421,"imports":303227364,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"BT","country":"Bhutan","latitude":27.514162,"longitude":90.433601,"exports":0,"imports":3044564,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"BO","country":"Bolivia","latitude":-16.290154,"longitude":-63.588653,"exports":88217581.84,"imports":671778487,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"BA","country":"Bosnia and Herzegovina","latitude":43.915886,"longitude":17.679076,"exports":43875267.45,"imports":67994944,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"BW","country":"Botswana","latitude":-22.328474,"longitude":24.684866,"exports":563248651,"imports":313410847,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"BR","country":"Brazil","latitude":-14.235004,"longitude":-51.92528,"exports":55461889747,"imports":21801853678,"scs_trade_percent":"1.15%"},
{"year":2016,"code":"BN","country":"Brunei","latitude":4.535277,"longitude":114.727669,"exports":3052681733,"imports":2748123055,"scs_trade_percent":"0.09%"},
{"year":2016,"code":"BG","country":"Bulgaria","latitude":42.733883,"longitude":25.48583,"exports":1096347460,"imports":1482485730,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"BF","country":"Burkina Faso","latitude":12.238333,"longitude":-1.561593,"exports":161783929.2,"imports":232102184,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"BI","country":"Burundi","latitude":-3.373056,"longitude":29.918886,"exports":8732961.72,"imports":43373711,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"KH","country":"Cambodia","latitude":12.565679,"longitude":104.990963,"exports":10474206281,"imports":16371275499,"scs_trade_percent":"0.40%"},
{"year":2016,"code":"CM","country":"Cameroon","latitude":7.369722,"longitude":12.354722,"exports":567262531.8,"imports":2059117162,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"CA","country":"Canada","latitude":56.130366,"longitude":-106.346771,"exports":14195381391,"imports":7578792634,"scs_trade_percent":"0.32%"},
{"year":2016,"code":"CV","country":"Cape Verde","latitude":16.002082,"longitude":-24.013197,"exports":2155777,"imports":66489619,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"CF","country":"Central African Republic","latitude":6.611111,"longitude":20.939444,"exports":34569256.19,"imports":32421173,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"TD","country":"Chad","latitude":15.454166,"longitude":18.732207,"exports":184391116,"imports":83342384,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"CL","country":"Chile","latitude":-35.675147,"longitude":-71.542969,"exports":11451257354,"imports":4025378207,"scs_trade_percent":"0.23%"},
{"year":2016,"code":"CN","country":"China","latitude":35.86166,"longitude":104.195397,"exports":873946007095,"imports":597624922781,"scs_trade_percent":"21.85%"},
{"year":2016,"code":"CO","country":"Colombia","latitude":4.570868,"longitude":-74.297333,"exports":2777595702,"imports":3202148825,"scs_trade_percent":"0.09%"},
{"year":2016,"code":"KM","country":"Comoros","latitude":-11.875001,"longitude":43.872219,"exports":3126635,"imports":68461314,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"CD","country":"Congo","latitude":-4.038333,"longitude":21.758664,"exports":2519969396,"imports":2160956403,"scs_trade_percent":"0.07%"},
{"year":2016,"code":"CG","country":"Congo, Democratic Republic of","latitude":-0.228021,"longitude":15.827659,"exports":2684913621,"imports":1101361603,"scs_trade_percent":"0.06%"},
{"year":2016,"code":"CR","country":"Costa Rica","latitude":9.748917,"longitude":-83.753428,"exports":131170453,"imports":509846802,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"CI","country":"Cote d'Ivoire","latitude":7.539989,"longitude":-5.54708,"exports":840854170.9,"imports":2261403726,"scs_trade_percent":"0.05%"},
{"year":2016,"code":"HR","country":"Croatia","latitude":45.1,"longitude":15.2,"exports":282380815.5,"imports":1460867773,"scs_trade_percent":"0.03%"},
{"year":2016,"code":"CU","country":"Cuba","latitude":21.521757,"longitude":-77.781167,"exports":189208932,"imports":327149678,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"CW","country":"Curacao","latitude":12.188567,"longitude":-68.99367,"exports":1848382,"imports":13902695,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"CY","country":"Cyprus","latitude":35.126413,"longitude":33.429859,"exports":96242648.91,"imports":1452893895,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"CZ","country":"Czech Republic","latitude":49.817492,"longitude":15.472962,"exports":4109483229,"imports":9946824758,"scs_trade_percent":"0.21%"},
{"year":2016,"code":"DK","country":"Denmark","latitude":56.26392,"longitude":9.501785,"exports":6697338845,"imports":6810030672,"scs_trade_percent":"0.20%"},
{"year":2016,"code":"DJ","country":"Djibouti","latitude":11.825138,"longitude":42.590275,"exports":2503753,"imports":2781389439,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"DM","country":"Dominica","latitude":15.414999,"longitude":-61.370976,"exports":1190702,"imports":44466904,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"DO","country":"Dominican Republic","latitude":18.735693,"longitude":-70.162651,"exports":188333280.1,"imports":355446567,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"EC","country":"Ecuador","latitude":-1.831239,"longitude":-78.183406,"exports":1836545132,"imports":888870928,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"EG","country":"Egypt","latitude":26.820553,"longitude":30.802498,"exports":965019398.3,"imports":16257411598,"scs_trade_percent":"0.26%"},
{"year":2016,"code":"SV","country":"El Salvador","latitude":13.794185,"longitude":-88.89653,"exports":69098111.49,"imports":372276285,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"GQ","country":"Equatorial Guinea","latitude":1.650801,"longitude":10.267895,"exports":1450036901,"imports":174526740,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"ER","country":"Eritrea","latitude":15.179384,"longitude":39.782334,"exports":187962770,"imports":78345137,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"EE","country":"Estonia","latitude":58.595272,"longitude":25.013607,"exports":315254500.7,"imports":1117632624,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"ET","country":"Ethiopia","latitude":9.145,"longitude":40.489673,"exports":642975989,"imports":2847353007,"scs_trade_percent":"0.05%"},
{"year":2016,"code":"FK","country":"Falkland Islands","latitude":-51.796253,"longitude":-59.523613,"exports":2008781,"imports":43332,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"FO","country":"Faroe Islands","latitude":61.892635,"longitude":-6.911806,"exports":36280879,"imports":3507841,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"FJ","country":"Fiji","latitude":-16.578193,"longitude":179.414413,"exports":61961032,"imports":817738937,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"FI","country":"Finland","latitude":61.92411,"longitude":25.748151,"exports":5547034937,"imports":3732034045,"scs_trade_percent":"0.14%"},
{"year":2016,"code":"FR","country":"France","latitude":46.227638,"longitude":2.213749,"exports":42137334201,"imports":41323839229,"scs_trade_percent":"1.24%"},
{"year":2016,"code":"PF","country":"French Polynesia","latitude":-17.679742,"longitude":-149.406843,"exports":39941794,"imports":159796459,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"GA","country":"Gabon","latitude":-0.803689,"longitude":11.609444,"exports":1955117108,"imports":569555246,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"GM","country":"Gambia, The","latitude":13.443182,"longitude":-15.310139,"exports":91826541,"imports":421197133,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"GE","country":"Georgia","latitude":42.315407,"longitude":43.356892,"exports":0,"imports":104596090,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"DE","country":"Germany","latitude":51.165691,"longitude":10.451526,"exports":116881209881,"imports":98592591014,"scs_trade_percent":"3.20%"},
{"year":2016,"code":"GH","country":"Ghana","latitude":7.946527,"longitude":-1.023194,"exports":1881328646,"imports":6126169568,"scs_trade_percent":"0.12%"},
{"year":2016,"code":"GI","country":"Gibraltar","latitude":36.137741,"longitude":-5.345374,"exports":783531,"imports":49906369,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"GR","country":"Greece","latitude":39.074208,"longitude":21.824312,"exports":1059405109,"imports":7685060731,"scs_trade_percent":"0.13%"},
{"year":2016,"code":"GL","country":"Greenland","latitude":71.706936,"longitude":-42.604303,"exports":126694344,"imports":1467507,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"GD","country":"Grenada","latitude":12.262776,"longitude":-61.604171,"exports":216243,"imports":22386677,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"GU","country":"Guam","latitude":13.444304,"longitude":144.793731,"exports":10892728,"imports":360230381,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"GT","country":"Guatemala","latitude":15.783471,"longitude":-90.230759,"exports":133125893.9,"imports":931623687,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"GN","country":"Guinea","latitude":9.945587,"longitude":-9.696645,"exports":707930765.9,"imports":1487265308,"scs_trade_percent":"0.03%"},
{"year":2016,"code":"GW","country":"Guinea-Bissau","latitude":11.803749,"longitude":-15.180413,"exports":37706765,"imports":33797210,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"GY","country":"Guyana","latitude":4.860416,"longitude":-58.93018,"exports":17562362,"imports":17914434,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"HT","country":"Haiti","latitude":18.971187,"longitude":-72.285215,"exports":16128419,"imports":180550094,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"HN","country":"Honduras","latitude":15.199999,"longitude":-86.241905,"exports":43112666.66,"imports":227535564,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"HK","country":"Hong Kong","latitude":22.396428,"longitude":114.109497,"exports":139680030037,"imports":229925271179,"scs_trade_percent":"5.49%"},
{"year":2016,"code":"HU","country":"Hungary","latitude":47.162494,"longitude":19.503304,"exports":4126334991,"imports":7932533868,"scs_trade_percent":"0.18%"},
{"year":2016,"code":"IS","country":"Iceland","latitude":64.963051,"longitude":-19.020835,"exports":314604041.8,"imports":140653028,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"IN","country":"India","latitude":20.593684,"longitude":78.96288,"exports":66028284555,"imports":123113508875,"scs_trade_percent":"2.81%"},
{"year":2016,"code":"ID","country":"Indonesia","latitude":-0.789275,"longitude":113.921327,"exports":121255878652,"imports":117646828793,"scs_trade_percent":"3.55%"},
{"year":2016,"code":"IR","country":"Iran","latitude":32.427908,"longitude":53.688046,"exports":21244011453,"imports":21546005591,"scs_trade_percent":"0.64%"},
{"year":2016,"code":"IQ","country":"Iraq","latitude":33.223191,"longitude":43.679291,"exports":16783983676,"imports":9666003305,"scs_trade_percent":"0.39%"},
{"year":2016,"code":"IE","country":"Ireland","latitude":53.41291,"longitude":-8.24389,"exports":5135184804,"imports":4034233621,"scs_trade_percent":"0.14%"},
{"year":2016,"code":"IL","country":"Israel","latitude":31.046051,"longitude":34.851612,"exports":9114582325,"imports":13960005826,"scs_trade_percent":"0.34%"},
{"year":2016,"code":"IT","country":"Italy","latitude":41.87194,"longitude":12.56738,"exports":31700724186,"imports":38820735240,"scs_trade_percent":"1.05%"},
{"year":2016,"code":"JM","country":"Jamaica","latitude":18.109581,"longitude":-77.297508,"exports":20095139,"imports":159371032,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"JP","country":"Japan","latitude":36.204824,"longitude":138.252924,"exports":141366306898,"imports":98171047741,"scs_trade_percent":"3.56%"},
{"year":2016,"code":"JO","country":"Jordan","latitude":30.585164,"longitude":36.238414,"exports":475932318.9,"imports":4637665049,"scs_trade_percent":"0.08%"},
{"year":2016,"code":"KZ","country":"Kazakhstan","latitude":48.019573,"longitude":66.923684,"exports":0,"imports":51366339,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"KE","country":"Kenya","latitude":-0.023559,"longitude":37.906193,"exports":367640434.6,"imports":6305795251,"scs_trade_percent":"0.10%"},
{"year":2016,"code":"KI","country":"Kiribati","latitude":-3.370417,"longitude":-168.734039,"exports":1991619,"imports":36104625,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"XK","country":"Kosovo","latitude":42.602636,"longitude":20.902977,"exports":6783.53,"imports":276967,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"KW","country":"Kuwait","latitude":29.31166,"longitude":47.481766,"exports":20932120184,"imports":5592697912,"scs_trade_percent":"0.39%"},
{"year":2016,"code":"KG","country":"Kyrgyzstan","latitude":41.20438,"longitude":74.766098,"exports":0,"imports":0,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"LA","country":"Laos","latitude":19.85627,"longitude":102.495496,"exports":0,"imports":31516854,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"LV","country":"Latvia","latitude":56.879635,"longitude":24.603189,"exports":335088505.6,"imports":1463135736,"scs_trade_percent":"0.03%"},
{"year":2016,"code":"LB","country":"Lebanon","latitude":33.854721,"longitude":35.862285,"exports":107776129.4,"imports":2898864503,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"LS","country":"Lesotho","latitude":-29.609988,"longitude":28.233608,"exports":16422537.15,"imports":86739667,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"LR","country":"Liberia","latitude":6.428055,"longitude":-9.429499,"exports":67722029,"imports":7179780938,"scs_trade_percent":"0.11%"},
{"year":2016,"code":"LY","country":"Libya","latitude":26.3351,"longitude":17.228331,"exports":565575361.8,"imports":2196383892,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"LT","country":"Lithuania","latitude":55.169438,"longitude":23.881275,"exports":899808743.5,"imports":1741694590,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"LU","country":"Luxembourg","latitude":49.815273,"longitude":6.129583,"exports":468862673.4,"imports":870519798,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"MO","country":"Macao","latitude":22.198745,"longitude":113.543873,"exports":193235163,"imports":1494651196,"scs_trade_percent":"0.03%"},
{"year":2016,"code":"MK","country":"Macedonia","latitude":41.608635,"longitude":21.745275,"exports":49125714.82,"imports":108966806,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"MG","country":"Madagascar","latitude":-18.766947,"longitude":46.869107,"exports":477872473,"imports":1246241274,"scs_trade_percent":"0.03%"},
{"year":2016,"code":"MW","country":"Malawi","latitude":-13.254308,"longitude":34.301525,"exports":93079275.95,"imports":295074765,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"MY","country":"Malaysia","latitude":4.210484,"longitude":101.975766,"exports":106354517731,"imports":106347944293,"scs_trade_percent":"3.16%"},
{"year":2016,"code":"MV","country":"Maldives","latitude":3.202778,"longitude":73.22068,"exports":41809326.09,"imports":852707901,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"ML","country":"Mali","latitude":17.570692,"longitude":-3.996166,"exports":176567942.3,"imports":405746878,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"MT","country":"Malta","latitude":35.937496,"longitude":14.375416,"exports":465332680.3,"imports":3684101281,"scs_trade_percent":"0.06%"},
{"year":2016,"code":"MH","country":"Marshall Islands","latitude":7.131474,"longitude":171.184478,"exports":31265560,"imports":4109417639,"scs_trade_percent":"0.06%"},
{"year":2016,"code":"MR","country":"Mauritania","latitude":21.00789,"longitude":-10.940835,"exports":892516296.7,"imports":1072346009,"scs_trade_percent":"0.03%"},
{"year":2016,"code":"MU","country":"Mauritius","latitude":-20.348404,"longitude":57.552152,"exports":182328163.6,"imports":1343065307,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"MX","country":"Mexico","latitude":23.634501,"longitude":-102.552784,"exports":6507511588,"imports":17435152589,"scs_trade_percent":"0.36%"},
{"year":2016,"code":"FM","country":"Micronesia","latitude":7.425554,"longitude":150.550812,"exports":19755846,"imports":47040406,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"MD","country":"Moldova","latitude":47.411631,"longitude":28.369885,"exports":35598443.58,"imports":84948080,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"MN","country":"Mongolia","latitude":46.862496,"longitude":103.846656,"exports":0,"imports":207055617,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"ME","country":"Montenegro","latitude":42.708678,"longitude":19.37439,"exports":36614476.97,"imports":126106455,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"MS","country":"Montserrat","latitude":16.742498,"longitude":-62.187366,"exports":546,"imports":241763,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"MA","country":"Morocco","latitude":31.791702,"longitude":-7.09262,"exports":877251910.9,"imports":4348975828,"scs_trade_percent":"0.08%"},
{"year":2016,"code":"MZ","country":"Mozambique","latitude":-18.665695,"longitude":35.529562,"exports":723682242.4,"imports":1878830771,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"MM","country":"Myanmar","latitude":21.913965,"longitude":95.956223,"exports":6111227464,"imports":14330977319,"scs_trade_percent":"0.30%"},
{"year":2016,"code":"NA","country":"Namibia","latitude":-22.95764,"longitude":18.49041,"exports":632402326.5,"imports":323831785,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"NR","country":"Nauru","latitude":-0.522778,"longitude":166.931503,"exports":376280,"imports":3736276,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"NP","country":"Nepal","latitude":28.394857,"longitude":84.124008,"exports":0,"imports":14983910,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"NL","country":"Netherlands","latitude":52.132633,"longitude":5.291266,"exports":27197107485,"imports":86725489554,"scs_trade_percent":"1.69%"},
{"year":2016,"code":"AN","country":"Netherlands Antilles","latitude":12.226079,"longitude":-69.060087,"exports":99843,"imports":65933342,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"NC","country":"New Caledonia","latitude":-20.904305,"longitude":165.618042,"exports":658758569,"imports":384700294,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"NZ","country":"New Zealand","latitude":-40.900557,"longitude":174.885971,"exports":7034386907,"imports":5766610409,"scs_trade_percent":"0.19%"},
{"year":2016,"code":"NI","country":"Nicaragua","latitude":12.865416,"longitude":-85.207229,"exports":116985001,"imports":361336513,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"NE","country":"Niger","latitude":17.607789,"longitude":8.081666,"exports":268990044,"imports":143928241,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"NG","country":"Nigeria","latitude":9.081999,"longitude":8.675277,"exports":3122615228,"imports":12065369085,"scs_trade_percent":"0.23%"},
{"year":2016,"code":"KP","country":"North Korea","latitude":40.339852,"longitude":127.510093,"exports":0,"imports":0,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"MP","country":"Northern Mariana Islands","latitude":17.33083,"longitude":145.38469,"exports":0,"imports":10000000,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"NO","country":"Norway","latitude":60.472024,"longitude":8.468946,"exports":7545113732,"imports":8434307317,"scs_trade_percent":"0.24%"},
{"year":2016,"code":"OM","country":"Oman","latitude":21.512583,"longitude":55.923255,"exports":20157907156,"imports":4729234655,"scs_trade_percent":"0.37%"},
{"year":2016,"code":"PK","country":"Pakistan","latitude":30.375321,"longitude":69.345116,"exports":4069434879,"imports":25740747917,"scs_trade_percent":"0.44%"},
{"year":2016,"code":"PW","country":"Palau","latitude":7.51498,"longitude":134.58252,"exports":215170,"imports":25789670,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"PS","country":"Palestine","latitude":31.952162,"longitude":35.233154,"exports":2535594.19,"imports":88912637,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"PA","country":"Panama","latitude":8.537981,"longitude":-80.782127,"exports":86796561.03,"imports":6599071751,"scs_trade_percent":"0.10%"},
{"year":2016,"code":"PG","country":"Papua New Guinea","latitude":-6.314993,"longitude":143.95555,"exports":2731111447,"imports":1460220883,"scs_trade_percent":"0.06%"},
{"year":2016,"code":"PY","country":"Paraguay","latitude":-23.442503,"longitude":-58.443832,"exports":143085522,"imports":234164022,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"PE","country":"Peru","latitude":-9.189967,"longitude":-75.015152,"exports":6779641719,"imports":2571964899,"scs_trade_percent":"0.14%"},
{"year":2016,"code":"PH","country":"Philippines","latitude":12.879721,"longitude":121.774017,"exports":31413819377,"imports":75347666014,"scs_trade_percent":"1.59%"},
{"year":2016,"code":"PL","country":"Poland","latitude":51.919438,"longitude":19.145136,"exports":5088845317,"imports":19858521293,"scs_trade_percent":"0.37%"},
{"year":2016,"code":"PT","country":"Portugal","latitude":39.399872,"longitude":-8.224454,"exports":1606892576,"imports":5458778980,"scs_trade_percent":"0.10%"},
{"year":2016,"code":"QA","country":"Qatar","latitude":25.354826,"longitude":51.183884,"exports":20941859319,"imports":3086141882,"scs_trade_percent":"0.36%"},
{"year":2016,"code":"RO","country":"Romania","latitude":45.943161,"longitude":24.96676,"exports":1940026387,"imports":4688946671,"scs_trade_percent":"0.10%"},
{"year":2016,"code":"RU","country":"Russia","latitude":61.52401,"longitude":105.318756,"exports":8140324981,"imports":6633409325,"scs_trade_percent":"0.22%"},
{"year":2016,"code":"RW","country":"Rwanda","latitude":-1.940278,"longitude":29.873888,"exports":51773155.74,"imports":193125321,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"KN","country":"Saint Kitts and Nevis","latitude":17.357822,"longitude":-62.782998,"exports":193065,"imports":8328164,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"LC","country":"Saint Lucia","latitude":13.909444,"longitude":-60.978893,"exports":759623,"imports":17760206,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"VC","country":"Saint Vincent and the Grenadines","latitude":12.984305,"longitude":-61.287228,"exports":16290,"imports":36640875,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"WS","country":"Samoa","latitude":-13.759029,"longitude":-172.104629,"exports":3814647,"imports":131787471,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"SM","country":"San Marino","latitude":43.94236,"longitude":12.457777,"exports":7726743,"imports":1581158,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"ST","country":"Sao Tome and Principe","latitude":0.18636,"longitude":6.613081,"exports":318255.48,"imports":9621686,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"SA","country":"Saudi Arabia","latitude":23.885942,"longitude":45.079162,"exports":63735096249,"imports":32729933739,"scs_trade_percent":"1.43%"},
{"year":2016,"code":"SN","country":"Senegal","latitude":14.497401,"longitude":-14.452362,"exports":265328562,"imports":2984388413,"scs_trade_percent":"0.05%"},
{"year":2016,"code":"RS","country":"Serbia","latitude":44.016521,"longitude":21.005859,"exports":471532530.5,"imports":561905010,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"SC","country":"Seychelles","latitude":-4.679574,"longitude":55.491977,"exports":24101701.67,"imports":176649269,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"SL","country":"Sierra Leone","latitude":8.460555,"longitude":-11.779889,"exports":239409047.8,"imports":332726605,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"SG","country":"Singapore","latitude":1.352083,"longitude":103.819836,"exports":214337522376,"imports":187415843133,"scs_trade_percent":"5.97%"},
{"year":2016,"code":"SX","country":"Sint Maarten","latitude":18.044579,"longitude":-63.058491,"exports":0,"imports":20503,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"SK","country":"Slovak Republic","latitude":48.669026,"longitude":19.699024,"exports":2480821083,"imports":5956141848,"scs_trade_percent":"0.13%"},
{"year":2016,"code":"SI","country":"Slovenia","latitude":46.151241,"longitude":14.995463,"exports":739401716.4,"imports":4422176145,"scs_trade_percent":"0.08%"},
{"year":2016,"code":"SB","country":"Solomon Islands","latitude":-9.64571,"longitude":160.156194,"exports":427859664,"imports":217372202,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"SO","country":"Somalia","latitude":5.152149,"longitude":46.199616,"exports":23096439.59,"imports":548781119,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"ZA","country":"South Africa","latitude":-30.559482,"longitude":22.937506,"exports":16686402542,"imports":20400413936,"scs_trade_percent":"0.55%"},
{"year":2016,"code":"KR","country":"South Korea","latitude":35.907757,"longitude":127.766922,"exports":248760505294,"imports":174448111630,"scs_trade_percent":"6.28%"},
{"year":2016,"code":"OD","country":"South Sudan","latitude":6.967234,"longitude":30.470673,"exports":1449109984,"imports":45023797,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"ES","country":"Spain","latitude":40.463667,"longitude":-3.74922,"exports":13420173718,"imports":30465638845,"scs_trade_percent":"0.65%"},
{"year":2016,"code":"LK","country":"Sri Lanka","latitude":7.873054,"longitude":80.771797,"exports":1949067966,"imports":8629671899,"scs_trade_percent":"0.16%"},
{"year":2016,"code":"SD","country":"Sudan","latitude":12.862807,"longitude":30.217636,"exports":168050135,"imports":2558096514,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"SR","country":"Suriname","latitude":3.919305,"longitude":-56.027783,"exports":30828079,"imports":33747257,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"SZ","country":"Swaziland","latitude":-26.522503,"longitude":31.465866,"exports":15570600.26,"imports":71319651,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"SE","country":"Sweden","latitude":60.128161,"longitude":18.643501,"exports":9503612351,"imports":9830384666,"scs_trade_percent":"0.29%"},
{"year":2016,"code":"CH","country":"Switzerland","latitude":46.818188,"longitude":8.227512,"exports":37352425577,"imports":20607521759,"scs_trade_percent":"0.86%"},
{"year":2016,"code":"SY","country":"Syria","latitude":34.802075,"longitude":38.996815,"exports":12454238.42,"imports":1306068509,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"TW","country":"Taiwan","latitude":23.69781,"longitude":120.960515,"exports":97124906496,"imports":107715577257,"scs_trade_percent":"3.04%"},
{"year":2016,"code":"TJ","country":"Tajikistan","latitude":38.861034,"longitude":71.276093,"exports":0,"imports":2292751,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"TZ","country":"Tanzania","latitude":-6.369028,"longitude":34.888822,"exports":654888381.2,"imports":4529248449,"scs_trade_percent":"0.08%"},
{"year":2016,"code":"TH","country":"Thailand","latitude":15.870032,"longitude":100.992541,"exports":170033285950,"imports":133890227439,"scs_trade_percent":"4.51%"},
{"year":2016,"code":"TL","country":"Timor-Leste","latitude":-8.874217,"longitude":125.727539,"exports":2002510.21,"imports":135459635,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"TG","country":"Togo","latitude":8.619543,"longitude":0.824782,"exports":171445178.7,"imports":2886221745,"scs_trade_percent":"0.05%"},
{"year":2016,"code":"TO","country":"Tonga","latitude":-21.178986,"longitude":-175.198242,"exports":8364719,"imports":43997408,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"TT","country":"Trinidad and Tobago","latitude":10.691803,"longitude":-61.222503,"exports":282132408,"imports":568005925,"scs_trade_percent":"0.01%"},
{"year":2016,"code":"TN","country":"Tunisia","latitude":33.886917,"longitude":9.537499,"exports":132712331.4,"imports":1836265248,"scs_trade_percent":"0.03%"},
{"year":2016,"code":"TR","country":"Turkey","latitude":38.963745,"longitude":35.243322,"exports":5145250386,"imports":29195441050,"scs_trade_percent":"0.51%"},
{"year":2016,"code":"TM","country":"Turkmenistan","latitude":38.969719,"longitude":59.556278,"exports":0,"imports":57624303,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"TV","country":"Tuvalu","latitude":-7.109535,"longitude":177.64933,"exports":221428,"imports":24918387,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"UG","country":"Uganda","latitude":1.373333,"longitude":32.290275,"exports":126528226.8,"imports":954071443,"scs_trade_percent":"0.02%"},
{"year":2016,"code":"UA","country":"Ukraine","latitude":48.379433,"longitude":31.16558,"exports":4514201920,"imports":4994122446,"scs_trade_percent":"0.14%"},
{"year":2016,"code":"AE","country":"United Arab Emirates","latitude":23.424076,"longitude":53.847818,"exports":39953999548,"imports":61020720820,"scs_trade_percent":"1.50%"},
{"year":2016,"code":"GB","country":"United Kingdom","latitude":55.378051,"longitude":-3.435973,"exports":42010297801,"imports":81515694512,"scs_trade_percent":"1.83%"},
{"year":2016,"code":"US","country":"United States","latitude":37.09024,"longitude":-95.712891,"exports":83048112055,"imports":125375538582,"scs_trade_percent":"3.09%"},
{"year":2016,"code":"UY","country":"Uruguay","latitude":-32.522779,"longitude":-55.765835,"exports":2114968397,"imports":1540893870,"scs_trade_percent":"0.05%"},
{"year":2016,"code":"UZ","country":"Uzbekistan","latitude":41.377491,"longitude":64.585262,"exports":0,"imports":116619384,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"VU","country":"Vanuatu","latitude":-15.376706,"longitude":166.959158,"exports":13278022,"imports":132034303,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"VA","country":"Vatican","latitude":41.902916,"longitude":12.453389,"exports":63273,"imports":57371,"scs_trade_percent":"0.00%"},
{"year":2016,"code":"VE","country":"Venezuela","latitude":6.42375,"longitude":-66.58973,"exports":3606076822,"imports":757573154,"scs_trade_percent":"0.06%"},
{"year":2016,"code":"VN","country":"Vietnam","latitude":14.058324,"longitude":108.277199,"exports":157780614519,"imports":160618605807,"scs_trade_percent":"4.73%"},
{"year":2016,"code":"YE","country":"Yemen","latitude":15.552727,"longitude":48.516388,"exports":211258159,"imports":2544092694,"scs_trade_percent":"0.04%"},
{"year":2016,"code":"ZM","country":"Zambia","latitude":-13.133897,"longitude":27.849332,"exports":2798571910,"imports":565928276,"scs_trade_percent":"0.05%"},
{"year":2016,"code":"ZW","country":"Zimbabwe","latitude":-19.015438,"longitude":29.154857,"exports":736866084.7,"imports":457355107,"scs_trade_percent":"0.02%"}];

var bilateralData = [{"origin":"East Asia","destination":"North America","origin-latlong":"33.053667, 107.933937","destination-latlong":"37.639343, -95.796531","high-end":472575638003,"low-end":128946764105},
{"origin":"East Asia","destination":"South America","origin-latlong":"33.053667, 107.933938","destination-latlong":"-6.229760, -59.765475","high-end":99600436072,"low-end":54471783041},
{"origin":"East Asia","destination":"Middle East","origin-latlong":"33.053667, 107.933939","destination-latlong":"30.294737, 51.732090","high-end":194622825587,"low-end":194622825587},
{"origin":"East Asia","destination":"Africa","origin-latlong":"33.053667, 107.933940","destination-latlong":"3.599309, 24.785304","high-end":132048901733,"low-end":132048901733},
{"origin":"East Asia","destination":"Europe","origin-latlong":"33.053667, 107.933941","destination-latlong":"49.202424, 16.527689","high-end":564964812611,"low-end":564964812611},
{"origin":"East Asia","destination":"South Asia","origin-latlong":"33.053667, 107.933942","destination-latlong":"20.539049, 79.281594","high-end":189972574612,"low-end":189754640039},
{"origin":"North America","destination":"East Asia","origin-latlong":"37.639343, -95.796531","destination-latlong":"33.053667, 107.933937","high-end":141414002999,"low-end":94450593149},
{"origin":"South America","destination":"East Asia","origin-latlong":"-6.229760, -59.765475","destination-latlong":"33.053667, 107.933938","high-end":114125954136,"low-end":94794495361},
{"origin":"Middle East","destination":"East Asia","origin-latlong":"30.294737, 51.732090","destination-latlong":"33.053667, 107.933939","high-end":219288990244,"low-end":219288990244},
{"origin":"Africa","destination":"East Asia","origin-latlong":"3.599309, 24.785304","destination-latlong":"33.053667, 107.933940","high-end":64244133876,"low-end":64244133876},
{"origin":"Europe","destination":"East Asia","origin-latlong":"49.202424, 16.527689","destination-latlong":"33.053667, 107.933941","high-end":407111081409,"low-end":407111081409},
{"origin":"South Asia","destination":"East Asia","origin-latlong":"20.539049, 79.281594","destination-latlong":"33.053667, 107.933942","high-end":78230912673,"low-end":65088113515}];


// ================================================== //
// Initialization
// ================================================== //

$.getJSON('data/world.geo.json' ,function(data){
    L.geoJson(data, {
        clickable: false,
        style: myCustomStyle
    }).addTo(map);

    map.scrollWheelZoom.disable()

    // Import trade data
    d3.csv('data/scs-trade.csv', function(data) {

        // Convert percentage strings into float numbers
        data.forEach(function(datum) {
            datum['scs_trade_percent_total_trade'] = parseFloat(datum['scs_trade_percent_total_trade']);
        });

        // menu.selectAll("option") // Add options to menu
        //     .data(ages)
        //     .enter().append("option")
        //     .text(function(d) { return d; });

        // menu.property("value", "18 to 24 Years"); // Set current option

        initEventHandlers(data);

        // // Draw map circles and charts
        circles = addCircles(map, data, parameter); // Map circles
        initChart(map, data); // Sidebar chart
        redrawChart(data, parameter); // Call redraw
    });
});


// ================================================== //
// Chart constructors
// ================================================== //

// Intra-regional trade map ============================= //

function addCircles(map, data, parameter) {
    var c = {};
    var circleArray = [];
    // NOTE: Change this to d3 range
    var multiplier;
    var popupMarkup;
    var format = function(t) {
        if (parameter == 'scs_trade_percent_total_trade') {
            var p;
            var x = parseFloat(t);
            if (x > 100) {
                p = '~100%';
            } else {
                p = Math.round(x) + '%';
            }
            return p;
        } else {
            return '$' + Math.round(t/1000000000) + ' billion';
        }
    }

    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var latitude = d.latitude;
        var longitude = d.longitude;
        var multiplier = (parameter == 'scs_trade_percent_total_trade') ? 70000 : 2;
        var radius = Math.sqrt(parseFloat(d[parameter])/Math.PI)*multiplier;

        popupMarkup = '<p>'+format(d[parameter])+'</p><p>'+d.country+'</p>';
        
        var circle = new L.circle([latitude, longitude], {
            radius: radius,
            className: 'overlay-circle'
        });

        circle.data = d; // Attach data to circles
        $(circle._path).attr('id', d.id); // Add unique country id to each circle

        circle.bindPopup(popupMarkup);
        circle.on('mouseover', function (e) {
            triggerCircleMouseover(this.data['iso_code']);
            this.openPopup();
            $(this._path).addClass('active');
        });
        circle.on('mouseout', function (e) {
            triggerCircleMouseout(this.data['iso_code']);
            this.closePopup();
            $(this._path).removeClass('active');
        });

        circleArray.push(circle);

        c[d.country] = circle;
    };
    circlesObj = c;
    c = L.layerGroup(circleArray).addTo(map);
    return c;
}


// Intra-regional trade chart ============================= //

function initChart(map, data) {
    // Sort the data in descending order
    // data.sort(function(a, b){
    //     return b[parameter] - a[parameter];
    // });

    // sidebarWidth = $('#sm-chart').width();

    // var x = d3.scaleLinear()
    //     .domain([0, data[0][parameter] ])
    //     .range([0, sidebarWidth - sidebarPadding - 80]);

    svgChart = d3.select('#sm-chart')
        .append('svg')
            .attr('width', 400)
            .attr('height', 300);
}


// ================================================== //
// Event handlers
// ================================================== //

function initEventHandlers(data) {
    // var menu = d3.select("#menu select")
    //     .on("change", change);

    $('#nav-tab-1 a').click(function(e) {
        e.preventDefault();
        parameter = 'scs_exports';
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        // $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('Exports Through the SCS (billions)');
        redrawChart(data, parameter);
        circles.clearLayers();
        circles = addCircles(map, data, parameter);
    });

    $('#nav-tab-2 a').click(function(e) {
        e.preventDefault();
        parameter = 'scs_imports';
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        // $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('Imports Through the SCS (billions)');
        redrawChart(data, parameter);
        circles.clearLayers();
        circles = addCircles(map, data, parameter);
    });

    $('#nav-tab-3 a').click(function(e) {
        e.preventDefault();
        parameter = 'scs_trade_percent_total_trade';
        $('.sm-nav-tabs a').removeClass('active');
        $(this).addClass('active');
        $('#sm-chart').fadeIn();
        $('#sm-chart-title').html('SCS trade as % of All Trade');
        redrawChart(data, parameter);
        circles.clearLayers();
        circles = addCircles(map, data, parameter);
    });
}

function update() {
    //
}

function redrawChart(data, parameter) {
    // Sort the data in descending order and get top 10
    var top = data.sort(function(a, b) { return b[parameter] - a[parameter]; }).slice(0, 10);
    var sidebarWidth = $('#sm-chart').width();
    var format = function(t) {
        if (parameter == 'scs_trade_percent_total_trade') {
            var p;
            var x = parseFloat(t);
            if (x > 100) {
                p = '~100%';
            } else {
                p = Math.round(x) + '%';
            }
            return p;
        } else {
            return '$' + Math.round(t/1000000000);
        }
    }

    // Define the domain
    var x = d3.scaleLinear()
        .domain([0, top[0][parameter] ])
        .range([0, sidebarWidth - sidebarPadding - 80]);
    
    var t = d3.transition()
        .duration(750);

    // BIND bar elements to data
    var bar = svgChart.selectAll(".bar")
        .data(top);

    // EXIT old elements not present in new data
    bar.exit()
        // .transition(t)
        // .style("opacity", 0)
        .remove();

    // UPDATE old elements present in new data
    bar.select("rect")
        .transition(t)
        .attr("width", function(d) {
            console.log(parseFloat(d[parameter]))
            return x(parseFloat(d[parameter])); // length of each bar
        })
        .attr('id', function(d) { // NOTE: Better way to activate bars from map circles?
            return d['iso_code'] // Attach a country id to each bar to access via map
        });
    bar.select(".label")
        .text(function(d) { return d['country']; });
    bar.select(".value")
        .text(function(d) { return format(parseFloat(d[parameter])); });

    // ENTER new elements present in new data
    var barEnter = bar.enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d, i) {
            return "translate(80," + i * barWidth + ")"; // NOTE: Improve how we y position?
        })
        .on("mouseover", triggerBarMouseover)
        .on("mouseout", triggerBarMouseout);
    
    barEnter.append("rect")
        .attr("width", function(d) {
            return x(parseFloat(d[parameter])); // length of each bar
        })
        .attr("height", barWidth - 1)
        .attr('id', function(d) { // NOTE: Better way to activate bars from map circles?
            return d['iso_code'] // Attach a country id to each bar to access via map
        });

    barEnter.append("text")
        .attr("class", "label")
        .attr("x", -5)
        .attr("y", barWidth / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function(d) { return d['country']; });

    barEnter.append("text")
        .attr("class", "value")
        .attr("x", 5)
        .attr("y", barWidth / 2)
        .attr("dy", ".35em")
        .text(function(d) { return format(parseFloat(d[parameter])); });
}

function triggerCircleMouseover(id) {
    $('#'+id).addClass('active');
}

function triggerCircleMouseout(id) {
    $('#'+id).removeClass('active');
}

function triggerBarMouseover(d, i) {
    var c = circlesObj[d.country];
    c.openPopup();
    $(c._path).addClass('active');
}

function triggerBarMouseout(d, i) {
    var c = circlesObj[d.country];
    c.closePopup();
    $(c._path).removeClass('active');
}










// Bilateral trade map ============================= //

// function initBilateralLayer(map, data, latlong) {
//     var c;
//     var circleArray = [];
//     var multiplier = 0.5;
//     var formatPopup = function(t) {
//         return '$' + Math.round(t/1000000000) + ' billion';
//     };
//     var formatCircle = function(c) {
//         return c/500000;
//     }

//     var circleOrigin = new L.circle([33.053667, 107.933937], {
//         radius: 100000,
//         className: 'overlay-circle'
//     });
//     circleArray.push(circleOrigin);

//     for (var i = 0; i < data.length; i++) {
//         var d = data[i];
//         var latitude = d[latlong].split(',')[0];
//         var longitude = d[latlong].split(',')[1];

//         var popupMarkup = '<p>'+formatPopup(d['low-end'])+'</p><p>Origin: '+d.origin+'</p><p>Destination: '+d.destination+'</p>';
        
//         // Draw a circle
//         var circle = new L.circle([latitude, longitude], {
//             radius: formatCircle(d['low-end']),
//             className: 'overlay-circle'
//         });

//         // Draw a line from origin to destination
//         var latlngs = [
//             [d['origin-latlong'].split(',')[0], d['origin-latlong'].split(',')[1]],
//             [d['destination-latlong'].split(',')[0], d['destination-latlong'].split(',')[1]]
//         ];
//         var polyline = L.polyline.antPath(latlngs, {
//             lineCap: 'round',
//             className: 'map-line',
//             dashArray: '5, 7',
//             delay: 1500,
//             opacity: 1,
//             weight: 2,
//             pulseColor: '#3E77B9'
//         });

//         circle.bindPopup(popupMarkup);
//         circle.on('mouseover', function (e) {
//             // triggerBilateralMouseover(this.data.id);
//             this.openPopup();
//             $(this._path).addClass('active');
//         });
//         circle.on('mouseout', function (e) {
//             // triggerBilateralMouseout(this.data.id);
//             this.closePopup();
//             $(this._path).removeClass('active');
//         });

//         circleArray.push(circle, polyline);
//     };
    
//     c = L.layerGroup(circleArray).addTo(map);
//     // zoom the map to the polyline
//     // map.fitBounds(c.getBounds());
//     return c;
// }






const countrySearch = document.getElementById("countrysearchwrapper");
const searchCountryBtn = document.getElementById("searchcountry")
const plansWrapper = document.getElementById("planswrapper")
const plansSublistWrapper = document.getElementById("planssublistwrapper")
const plansCount = document.getElementById("planscount")
const mainwrap = document.getElementById("mainwrap")
const loadingWrap = document.getElementById("loading")
const allbtns = document.querySelectorAll("#search-section .buy-plan_filter-tag")
const tooltipwrapper = document.getElementById("tooltipwrapper")
const tooltipcountrylist = document.getElementById("tooltip-countrylist")



allbtns.forEach(btn => {

  btn.addEventListener("click", () => {
    loading = true
    loadingWrap.style.display = loading ? "block" : "none"
    plansCount.style.display = loading ? "none" : "block"
    plansWrapper.style.display = loading ? "none" : "flex"
    apiCall(btn.id, true)
    mainwrap.style.display = "block"
  })

})

const apiCall = async (code, fromRadio = false) => {
  tooltipwrapper.style.display = "none"
      tooltipwrapper.style.opacity = 0 
  console.log(code , 'before')
  if(code == 'NN') {
    code = '1N'
    console.log(code , 'before')
  }
  loading = true
  try {
    const res = await axios.get(`https://services.gigsky.com/api/v4/countries/${code}?simType=ANDROID_GSMA_ESIM`);
    let endpoints = []
    planssList = []
    res.data.list.map(e => {
      endpoints.push(`https://services.gigsky.com/api/v4/networkGroups/${e.networkGroupId}/plansExt`);
      //plans = []
      planssList.push({
        code: code,
        networkGroupName: e.networkGroupName,
        networkGroupId: e.networkGroupId,
        countryCodes : e.countryCodes
      })
    });
    console.log(endpoints, code ,planssList ,'before')
    if (fromRadio) {
      switch (code) {
        case 'IT':
          endpoints = [`https://services.gigsky.com/api/v4/networkGroups/50676/plansExt`]
          planssList = planssList.filter(e => e.networkGroupId == '50676')
          break;
     
      
        case 'GB':
          endpoints = [`https://services.gigsky.com/api/v4/networkGroups/50641/plansExt`]
          planssList = planssList.filter(e => e.networkGroupId == '50641') 
            break;
       
        case '1M':
          endpoints = [`https://services.gigsky.com/api/v4/networkGroups/50646/plansExt` , 'https://services.gigsky.com/api/v4/networkGroups/50566/plansExt']
          planssList = [...planssList , {code : '1N' , networkGroupName: "North Sea",
        networkGroupId: 50566 }]
          planssList = planssList.filter(e => e.networkGroupId == '50646' ||e.networkGroupId ==   "50566") 
            break;
        case 'DM':
          endpoints = [`https://services.gigsky.com/api/v4/networkGroups/50638/plansExt`]
          planssList = planssList.filter(e => e.networkGroupId == '50638') 
            break;
        case 'AE':
          endpoints = [`https://services.gigsky.com/api/v4/networkGroups/50346/plansExt`]
          planssList = planssList.filter(e => e.networkGroupId == '50346') 
            break;
      }
    } 
    console.log(endpoints, planssList , 'after')
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      (res) => {
        //console.log(plans, 1, 'before map')
        res.map(e => {
          const index = planssList.findIndex(f => f.networkGroupId == e.data.list[0].networkGroupId);
          planssList[index].list = e.data.list
          //console.log(plans, 'plans')
        });
        //console.log(plans, 2, 'after map')
        //console.log(plans, 4, 'before function call')
        updateHTML(planssList)
        loading = false
        loadingWrap.style.display = loading ? "block" : "none"
        plansWrapper.style.display = loading ? "none" : "flex"

      })


  }
  catch (err) {
    console.log(err)
    loading = false
    loadingWrap.style.display = loading ? "block" : "none"
    plansCount.style.display = loading ? "none" : "block"
    plansWrapper.style.display = loading ? "none" : "flex"

  }
}
 const countries = [
    {
      "type": "country",
      "name": "Afghanistan",
      "code": "AF"
    },
    {
      "type": "country",
      "name": "Åland Islands",
      "code": "AX"
    },
    {
      "type": "country",
      "name": "Albania",
      "code": "AL"
    },
    {
      "type": "country",
      "name": "Algeria",
      "code": "DZ"
    },
    {
      "type": "country",
      "name": "American Samoa",
      "code": "AS"
    },
    {
      "type": "country",
      "name": "Andorra",
      "code": "AD"
    },
    {
      "type": "country",
      "name": "Angola",
      "code": "AO"
    },
    {
      "type": "country",
      "name": "Anguilla",
      "code": "AI"
    },
    {
      "type": "country",
      "name": "Antarctica",
      "code": "AQ",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "Antigua and Barbuda",
      "code": "AG"
    },
    {
      "type": "country",
      "name": "Argentina",
      "code": "AR"
    },
    {
      "type": "country",
      "name": "Armenia",
      "code": "AM"
    },
    {
      "type": "country",
      "name": "Aruba",
      "code": "AW"
    },
    {
      "type": "country",
      "name": "Ascension Island",
      "code": "AC"
    },
     {
      "type": "region",
      "name": "Asia Pacific",
      "code": "JP"
    },
     {
      "type": "region",
      "name": "Africa",
      "code": "NG"
    },
    {
      "type": "country",
      "name": "Australia",
      "code": "AU"
    },
    {
      "type": "country",
      "name": "Austria",
      "code": "AT",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Azerbaijan",
      "code": "AZ"
    },
    {
      "type": "country",
      "name": "Bahamas",
      "code": "BS"
    },
    {
      "type": "country",
      "name": "Bahrain",
      "code": "BH"
    },
    {
      "type": "country",
      "name": "Bangladesh",
      "code": "BD"
    },
    {
      "type": "country",
      "name": "Barbados",
      "code": "BB"
    },
    {
      "type": "country",
      "name": "Belarus",
      "code": "BY"
    },
    {
      "type": "country",
      "name": "Belgium",
      "code": "BE",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Belize",
      "code": "BZ"
    },
    {
      "type": "country",
      "name": "Benin",
      "code": "BJ"
    },
    {
      "type": "country",
      "name": "Bermuda",
      "code": "BM"
    },
    {
      "type": "country",
      "name": "Bhutan",
      "code": "BT"
    },
    {
      "type": "country",
      "name": "Bolivia",
      "code": "BO"
    },
    {
      "type": "country",
      "name": "Bonaire, Sint Eustatius, and Saba",
      "code": "BQ"
    },
    {
      "type": "country",
      "name": "Bosnia and Herzegovina",
      "code": "BA"
    },
    {
      "type": "country",
      "name": "Botswana",
      "code": "BW"
    },
    {
      "type": "country",
      "name": "Bouvet Island",
      "code": "BV"
    },
    {
      "type": "country",
      "name": "Brazil",
      "code": "BR"
    },
    {
      "type": "country",
      "name": "British Indian Ocean Territory",
      "code": "IO",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "British Virgin Islands",
      "code": "VG",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "Brunei Darussalam",
      "code": "BN"
    },
    {
      "type": "country",
      "name": "Bulgaria",
      "code": "BG"
    },
    {
      "type": "country",
      "name": "Burkina Faso",
      "code": "BF"
    },
    {
      "type": "country",
      "name": "Burundi",
      "code": "BI"
    },
    {
      "type": "country",
      "name": "Cambodia",
      "code": "KH"
    },
    {
      "type": "country",
      "name": "Cameroon",
      "code": "CM"
    },
    {
      "type": "country",
      "name": "Canada",
      "code": "CA"
    },
    {
      "type": "country",
      "name": "Cape Verde",
      "code": "CV"
    },
    {
      "type": "region",
      "name": "Carribian",
      "code": "JM"
    },
    {
      "type": "country",
      "name": "Cayman Islands",
      "code": "KY"
    },
    {
      "type": "country",
      "name": "Central African Republic",
      "code": "CF"
    },
     {
      "type": "region",
      "name": "Central America",
      "code": "GT"
    },
    {
      "type": "country",
      "name": "Chad",
      "code": "TD"
    },
    {
      "type": "country",
      "name": "Chile",
      "code": "CL"
    },
    {
      "type": "country",
      "name": "China",
      "code": "CN"
    },
    {
      "type": "country",
      "name": "Christmas Island",
      "code": "CX"
    },
    {
      "type": "country",
      "name": "Cocos (Keeling) Islands",
      "code": "CC"
    },
    {
      "type": "country",
      "name": "Colombia",
      "code": "CO"
    },
    {
      "type": "country",
      "name": "Comoros",
      "code": "KM"
    },
    {
      "type": "country",
      "name": "Congo",
      "code": "CG"
    },
    {
      "type": "country",
      "name": "Congo (DRC)",
      "code": "CD"
    },
    {
      "type": "country",
      "name": "Cook Islands",
      "code": "CK"
    },
    {
      "type": "country",
      "name": "Costa Rica",
      "code": "CR"
    },
    {
      "type": "country",
      "name": "Côte d'Ivoire",
      "code": "CI"
    },
    {
      "type": "country",
      "name": "Croatia",
      "code": "HR"
    },
    {
      "type": "country",
      "name": "Cuba",
      "code": "CU"
    },
    {
      "type": "country",
      "name": "Curaçao",
      "code": "CW"
    },
    {
      "type": "country",
      "name": "Cyprus",
      "code": "CY",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Czech Republic",
      "code": "CZ"
    },
    {
      "type": "country",
      "name": "Denmark",
      "code": "DK"
    },
    {
      "type": "country",
      "name": "Djibouti",
      "code": "DJ"
    },
    {
      "type": "country",
      "name": "Dominica",
      "code": "DM"
    },
    {
      "type": "country",
      "name": "Dominican Republic",
      "code": "DO"
    },
    {
      "type": "country",
      "name": "Ecuador",
      "code": "EC"
    },
    {
      "type": "country",
      "name": "Egypt",
      "code": "EG"
    },
    {
      "type": "country",
      "name": "El Salvador",
      "code": "SV"
    },
    {
      "type": "country",
      "name": "Equatorial Guinea",
      "code": "GQ"
    },
    {
      "type": "country",
      "name": "Eritrea",
      "code": "ER"
    },
    {
      "type": "country",
      "name": "Estonia",
      "code": "EE",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Ethiopia",
      "code": "ET"
    },
    {
      "type": "region",
      "name": "Europe",
      "code": "FR"
    },
    {
      "type": "country",
      "name": "Falkland Islands (Malvinas)",
      "code": "FK"
    },
    {
      "type": "country",
      "name": "Faroe Islands",
      "code": "FO"
    },
    {
      "type": "country",
      "name": "Fiji",
      "code": "FJ"
    },
    {
      "type": "country",
      "name": "Finland",
      "code": "FI",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "France",
      "code": "FR",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "French Guiana",
      "code": "GF"
    },
    {
      "type": "country",
      "name": "French Polynesia",
      "code": "PF"
    },
    {
      "type": "country",
      "name": "French Southern Territories",
      "code": "TF"
    },
    {
      "type": "country",
      "name": "Gabon",
      "code": "GA"
    },
    {
      "type": "country",
      "name": "Gambia",
      "code": "GM"
    },
    {
      "type": "country",
      "name": "Georgia",
      "code": "GE"
    },
    {
      "type": "country",
      "name": "Germany",
      "code": "DE",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Ghana",
      "code": "GH"
    },
    {
      "type": "country",
      "name": "Gibraltar",
      "code": "GI",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "Grand Canyon",
      "code": "1P"
    },
    {
      "type": "country",
      "name": "Greece",
      "code": "GR",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Greenland",
      "code": "GL"
    },
    {
      "type": "country",
      "name": "Grenada",
      "code": "GD"
    },
    {
      "type": "country",
      "name": "Guadeloupe",
      "code": "GP"
    },
    {
      "type": "country",
      "name": "Guam",
      "code": "GU"
    },
    {
      "type": "country",
      "name": "Guatemala",
      "code": "GT"
    },
    {
      "type": "country",
      "name": "Guernsey",
      "code": "GG",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "Guinea",
      "code": "GN"
    },
    {
      "type": "country",
      "name": "Guinea-Bissau",
      "code": "GW"
    },
    {
      "type": "country",
      "name": "Gulf of Mexico",
      "code": "1M"
    },
    {
      "type": "country",
      "name": "Guyana",
      "code": "GY"
    },
    {
      "type": "country",
      "name": "Haiti",
      "code": "HT"
    },
    {
      "type": "country",
      "name": "Heard Island and McDonald Islands",
      "code": "HM"
    },
    {
      "type": "country",
      "name": "Helium",
      "code": "1H"
    },
    {
      "type": "country",
      "name": "Honduras",
      "code": "HN"
    },
    {
      "type": "country",
      "name": "Hong Kong",
      "code": "HK"
    },
    {
      "type": "country",
      "name": "Hungary",
      "code": "HU"
    },
    {
      "type": "country",
      "name": "Iceland",
      "code": "IS"
    },
    {
      "type": "country",
      "name": "India",
      "code": "IN"
    },
    {
      "type": "country",
      "name": "Indonesia",
      "code": "ID"
    },
    {
      "type": "country",
      "name": "Inflight",
      "code": "1A"
    },
    {
      "type": "country",
      "name": "Iran",
      "code": "IR"
    },
    {
      "type": "country",
      "name": "Iraq",
      "code": "IQ"
    },
    {
      "type": "country",
      "name": "Ireland",
      "code": "IE",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Isle of Man",
      "code": "IM",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "Israel",
      "code": "IL"
    },
    {
      "type": "country",
      "name": "Italy",
      "code": "IT",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Jamaica",
      "code": "JM"
    },
    {
      "type": "country",
      "name": "Japan",
      "code": "JP",
      "currency": "JPY"
    },
    {
      "type": "country",
      "name": "Jersey",
      "code": "JE",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "Jordan",
      "code": "JO"
    },
    {
      "type": "country",
      "name": "Kazakhstan",
      "code": "KZ"
    },
    {
      "type": "country",
      "name": "Kenya",
      "code": "KE"
    },
    {
      "type": "country",
      "name": "Kiribati",
      "code": "KI"
    },
    {
      "type": "country",
      "name": "Kosovo",
      "code": "XK"
    },
    {
      "type": "country",
      "name": "Kuwait",
      "code": "KW"
    },
    {
      "type": "country",
      "name": "Kyrgyzstan",
      "code": "KG"
    },
    {
      "type": "country",
      "name": "Laos",
      "code": "LA"
    },
     {
      "type": "region",
      "name": "Latin America",
      "code": "BR"
    },
    {
      "type": "country",
      "name": "Latvia",
      "code": "LV",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Lebanon",
      "code": "LB"
    },
    {
      "type": "country",
      "name": "Lesotho",
      "code": "LS"
    },
    {
      "type": "country",
      "name": "Liberia",
      "code": "LR"
    },
    {
      "type": "country",
      "name": "Libya",
      "code": "LY"
    },
    {
      "type": "country",
      "name": "Liechtenstein",
      "code": "LI"
    },
    {
      "type": "country",
      "name": "Lithuania",
      "code": "LT",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Luxembourg",
      "code": "LU",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Macau",
      "code": "MO"
    },
    {
      "type": "country",
      "name": "Macedonia, FYR",
      "code": "MK"
    },
    {
      "type": "country",
      "name": "Madagascar",
      "code": "MG"
    },
    {
      "type": "country",
      "name": "Malawi",
      "code": "MW"
    },
    {
      "type": "country",
      "name": "Malaysia",
      "code": "MY"
    },
    {
      "type": "country",
      "name": "Maldives",
      "code": "MV"
    },
    {
      "type": "country",
      "name": "Mali",
      "code": "ML"
    },
    {
      "type": "country",
      "name": "Malta",
      "code": "MT",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Marshall Islands",
      "code": "MH"
    },
    {
      "type": "country",
      "name": "Martinique",
      "code": "MQ"
    },
    {
      "type": "country",
      "name": "Mauritania",
      "code": "MR"
    },
    {
      "type": "country",
      "name": "Mauritius",
      "code": "MU"
    },
    {
      "type": "country",
      "name": "Mayotte",
      "code": "YT"
    },
    {
      "type": "country",
      "name": "Mexico",
      "code": "MX"
    },
    {
      "type": "country",
      "name": "Micronesia",
      "code": "FM"
    },
    {
      "type": "country",
      "name": "Moldova",
      "code": "MD"
    },
    {
      "type": "country",
      "name": "Monaco",
      "code": "MC"
    },
    {
      "type": "country",
      "name": "Mongolia",
      "code": "MN"
    },
    {
      "type": "country",
      "name": "Montenegro",
      "code": "ME"
    },
    {
      "type": "country",
      "name": "Montserrat",
      "code": "MS"
    },
    {
      "type": "country",
      "name": "Morocco",
      "code": "MA"
    },
    {
      "type": "country",
      "name": "Mozambique",
      "code": "MZ"
    },
    {
      "type": "country",
      "name": "Myanmar",
      "code": "MM"
    },
    {
      "type": "country",
      "name": "Namibia",
      "code": "NA"
    },
    {
      "type": "country",
      "name": "Nauru",
      "code": "NR"
    },
    {
      "type": "country",
      "name": "Nepal",
      "code": "NP"
    },
    {
      "type": "country",
      "name": "Netherlands",
      "code": "NL",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Netherlands Antilles",
      "code": "AN",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "New Caledonia",
      "code": "NC"
    },
    {
      "type": "country",
      "name": "New Zealand",
      "code": "NZ"
    },
    {
      "type": "country",
      "name": "Nicaragua",
      "code": "NI"
    },
    {
      "type": "country",
      "name": "Niger",
      "code": "NE"
    },
    {
      "type": "country",
      "name": "Nigeria",
      "code": "NG"
    },
    {
      "type": "country",
      "name": "Niue",
      "code": "NU"
    },
    {
      "type": "country",
      "name": "Norfolk Island",
      "code": "NF"
    },
         {
      "type": "region",
      "name": "North America",
      "code": "US"
    },
    {
      "type": "country",
      "name": "North Korea",
      "code": "KP"
    },
    {
      "type": "country",
      "name": "North Sea",
      "code": "1N"
    },
    {
      "type": "country",
      "name": "Northern Mariana Islands",
      "code": "MP"
    },
    {
      "type": "country",
      "name": "Norway",
      "code": "NO"
    },
    {
      "type": "country",
      "name": "Oman",
      "code": "OM"
    },
       {
      "type": "region",
      "name": "Offshore",
      "code": "NN"
    },
    {
      "type": "country",
      "name": "Over the air",
      "code": "XX"
    },
    {
      "type": "country",
      "name": "Pakistan",
      "code": "PK"
    },
    {
      "type": "country",
      "name": "Palau",
      "code": "PW"
    },
    {
      "type": "country",
      "name": "Palestine",
      "code": "PS"
    },
    {
      "type": "country",
      "name": "Panama",
      "code": "PA"
    },
    {
      "type": "country",
      "name": "Papua New Guinea",
      "code": "PG"
    },
    {
      "type": "country",
      "name": "Paraguay",
      "code": "PY"
    },
    {
      "type": "country",
      "name": "Peru",
      "code": "PE"
    },
    {
      "type": "country",
      "name": "Philippines",
      "code": "PH"
    },
    {
      "type": "country",
      "name": "Pitcairn",
      "code": "PN"
    },
    {
      "type": "country",
      "name": "Poland",
      "code": "PL"
    },
    {
      "type": "country",
      "name": "Portugal",
      "code": "PT",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Puerto Rico",
      "code": "PR"
    },
    {
      "type": "country",
      "name": "Qatar",
      "code": "QA"
    },
    {
      "type": "country",
      "name": "Réunion",
      "code": "RE"
    },
    {
      "type": "country",
      "name": "Romania",
      "code": "RO"
    },
    {
      "type": "country",
      "name": "Russia",
      "code": "RU"
    },
    {
      "type": "country",
      "name": "Rwanda",
      "code": "RW"
    },
    {
      "type": "country",
      "name": "Saint Barthélemy",
      "code": "BL"
    },
    {
      "type": "country",
      "name": "Saint Helena, Ascension and Tristan da Cunha",
      "code": "SH",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "Saint Kitts and Nevis",
      "code": "KN"
    },
    {
      "type": "country",
      "name": "Saint Lucia",
      "code": "LC"
    },
    {
      "type": "country",
      "name": "Saint Martin",
      "code": "MF"
    },
    {
      "type": "country",
      "name": "Saint Pierre and Miquelon",
      "code": "PM"
    },
    {
      "type": "country",
      "name": "Saint Vincent and the Grenadines",
      "code": "VC"
    },
    {
      "type": "country",
      "name": "Samoa",
      "code": "WS"
    },
    {
      "type": "country",
      "name": "San Marino",
      "code": "SM"
    },
    {
      "type": "country",
      "name": "Sao Tome and Principe",
      "code": "ST"
    },
    {
      "type": "country",
      "name": "Saudi Arabia",
      "code": "SA"
    },
    {
      "type": "country",
      "name": "Senegal",
      "code": "SN"
    },
    {
      "type": "country",
      "name": "Serbia",
      "code": "RS"
    },
    {
      "type": "country",
      "name": "Seychelles",
      "code": "SC"
    },
    {
      "type": "country",
      "name": "Sierra Leone",
      "code": "SL"
    },
    {
      "type": "country",
      "name": "Singapore",
      "code": "SG"
    },
    {
      "type": "country",
      "name": "Sint Maarten",
      "code": "SX"
    },
    {
      "type": "country",
      "name": "Slovakia",
      "code": "SK",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Slovenia",
      "code": "SI",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Solomon Islands",
      "code": "SB"
    },
    {
      "type": "country",
      "name": "Somalia",
      "code": "SO"
    },
    {
      "type": "country",
      "name": "South Africa",
      "code": "ZA"
    },
     {
      "type": "region",
      "name": "South America",
      "code": "FR"
    },
    {
      "type": "country",
      "name": "South Georgia and the South Sandwich Islands",
      "code": "GS",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "South Korea",
      "code": "KR"
    },
    {
      "type": "country",
      "name": "South Sudan",
      "code": "SS"
    },
    {
      "type": "country",
      "name": "Spain",
      "code": "ES",
      "currency": "EUR"
    },
    {
      "type": "country",
      "name": "Sri Lanka",
      "code": "LK"
    },
    {
      "type": "country",
      "name": "Sudan",
      "code": "SD"
    },
    {
      "type": "country",
      "name": "Suriname",
      "code": "SR"
    },
    {
      "type": "country",
      "name": "Svalbard and Jan Mayen",
      "code": "SJ"
    },
    {
      "type": "country",
      "name": "Swaziland",
      "code": "SZ"
    },
    {
      "type": "country",
      "name": "Sweden",
      "code": "SE"
    },
    {
      "type": "country",
      "name": "Switzerland",
      "code": "CH"
    },
    {
      "type": "country",
      "name": "Syria",
      "code": "SY"
    },
    {
      "type": "country",
      "name": "Taiwan",
      "code": "TW"
    },
    {
      "type": "country",
      "name": "Tajikistan",
      "code": "TJ"
    },
    {
      "type": "country",
      "name": "Tanzania",
      "code": "TZ"
    },
    {
      "type": "country",
      "name": "Thailand",
      "code": "TH"
    },
    {
      "type": "country",
      "name": "Timor-Leste",
      "code": "TL"
    },
    {
      "type": "country",
      "name": "Togo",
      "code": "TG"
    },
    {
      "type": "country",
      "name": "Tokelau",
      "code": "TK"
    },
    {
      "type": "country",
      "name": "Tonga",
      "code": "TO"
    },
    {
      "type": "country",
      "name": "Trinidad and Tobago",
      "code": "TT"
    },
    {
      "type": "country",
      "name": "Tunisia",
      "code": "TN"
    },
    {
      "type": "country",
      "name": "Turkey",
      "code": "TR"
    },
    {
      "type": "country",
      "name": "Turkmenistan",
      "code": "TM"
    },
    {
      "type": "country",
      "name": "Turks and Caicos Islands",
      "code": "TC"
    },
    {
      "type": "country",
      "name": "Tuvalu",
      "code": "TV"
    },
    {
      "type": "country",
      "name": "U.S. Virgin Islands",
      "code": "VI"
    },
    {
      "type": "country",
      "name": "Uganda",
      "code": "UG"
    },
    {
      "type": "country",
      "name": "Ukraine",
      "code": "UA"
    },
    {
      "type": "country",
      "name": "United Arab Emirates",
      "code": "AE"
    },
    {
      "type": "country",
      "name": "United Kingdom",
      "code": "GB",
      "currency": "GBP"
    },
    {
      "type": "country",
      "name": "United States",
      "code": "US"
    },
    {
      "type": "country",
      "name": "United States Minor Outlying Islands",
      "code": "UM"
    },
    {
      "type": "country",
      "name": "Uruguay",
      "code": "UY"
    },
    {
      "type": "country",
      "name": "Uzbekistan",
      "code": "UZ"
    },
    {
      "type": "country",
      "name": "Vanuatu",
      "code": "VU"
    },
    {
      "type": "country",
      "name": "Vatican City",
      "code": "VA"
    },
    {
      "type": "country",
      "name": "Venezuela",
      "code": "VE"
    },
    {
      "type": "country",
      "name": "Vietnam",
      "code": "VN"
    },
    {
      "type": "country",
      "name": "Wallis and Futuna",
      "code": "WF"
    },
    {
      "type": "country",
      "name": "Western Sahara",
      "code": "EH"
    },
    {
      "type": "country",
      "name": "Yemen",
      "code": "YE"
    },
    {
      "type": "country",
      "name": "Zambia",
      "code": "ZM"
    },
    {
      "type": "country",
      "name": "Zimbabwe",
      "code": "ZW"
    }
  ]
async function render() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('search')
  console.log(search, 'search')

  let loading = false



 
        
  let planssList = []

  loadingWrap.style.display = loading ? "block" : "none"
  plansCount.style.display = loading ? "none" : "block"
  plansWrapper.style.display = loading ? "none" : "flex"
  mainwrap.style.display = "none"


  if (countries.some(e => e.code == search)) {
    console.log("loading")
    loading = true
    loadingWrap.style.display = loading ? "block" : "none"
    plansCount.style.display = loading ? "none" : "block"
    plansWrapper.style.display = loading ? "none" : "flex"
    mainwrap.style.display = "none"
    apiCall(search)
    mainwrap.style.display = "block"
  }

  countries.forEach(item => {
    const clonedSelect = countrySearch.children[0].cloneNode()
    clonedSelect.innerText = item.name
    clonedSelect.id = item.name
    clonedSelect.value = item.code

    countrySearch.append(clonedSelect)
  })

  new TomSelect("#countrysearchwrapper", {
    maxOptions: 300,
    sortField: {
      field: "text",
      direction: "asc",
    },
  });

  searchCountryBtn.addEventListener("click", () => {
    loading = true
    loadingWrap.style.display = loading ? "block" : "none"
    plansCount.style.display = loading ? "none" : "block"
    plansWrapper.style.display = loading ? "none" : "flex"

    if (countrySearch.value == '') {
      //countrySearch.setCustomValidity("Input field empty")
      //////alert("input empty")

      loading = false
      loadingWrap.style.display = loading ? "block" : "none"
      plansCount.style.display = loading ? "none" : "block"
      plansWrapper.style.display = loading ? "none" : "flex"

    } else {
      //countrySearch.setCustomValidity("")
      //////alert("now make api call");
      apiCall(countrySearch.value)
      mainwrap.style.display = "block"
    }

  })

  // function onLoadFunction ( ) {
  //   alert("loaded")
  //   apiCall()
  // }
  // Window.onload = onLoadFunction();



}
render();

const updateHTML = (planssList, loading) => {

  plansWrapper.replaceChildren();
  if (planssList.length !== 0) {


    plansCount.innerText = `${planssList.length} available ${planssList.length == 1 ? "plan" : "plans"}:`
    plansCount.style.display = "block"
    planssList.map((plan, index) => {
      plansWrapper.insertAdjacentHTML("beforeend", `
    <div class="buy-plan_result-block">
      <div class="plan-head">
       <div class="buy-plan_result-heading">${plan?.networkGroupName}</div>
       <div data-list=${plan?.countryCodes} class="tool-tip" id="tooltip">
        <img class="image-cover" src="https://uploads-ssl.webflow.com/63875c881faed2a30e8fa583/63d3e9cc3ca2c943ca597892_Vector.svg" />
       </div>
      </div>
     
     <div class="buy-plan_result-wrap" id="planssublistwrapper">
     
     </div>
     <div class="buy-plan_button-wrap">
       <a href="#" class="buy-plan_button w-inline-block">
         <div>Buy</div>
       </a>
     </div>
   </div>
    `)

      {
        plan?.list?.map(e => {
          let currencySymbol
          switch (e.currency) {
            case "JPY":
              currencySymbol = "¥"
              break;
            case "GBP":
              currencySymbol = "£"
              break;
            case "EUR":
              currencySymbol = "€"
              break
            default:
              currencySymbol = "$"
          }
          console.log(currencySymbol, e, "currencysymbol")
          plansWrapper.children[index].querySelector("#planssublistwrapper").insertAdjacentHTML("beforeend",
            `<div  data-code=${plan?.code} data-id=${e.planId}  class="buy-plan_result-info-block hover-block" style="background-color: rgb(241, 243, 247); color: rgb(20, 20, 20);">
         <div id="w-node-_4568d13b-a5d8-ee34-4eac-268dab9d3ae2-b1d416f8"  class="result-size-number" style="color: rgb(20, 129, 255);">${e.dataLimitInKB < 1000000 ? `${Math.floor(e.dataLimitInKB / 1000)}MB` : `${Math.floor(e.dataLimitInKB / 1000000)}GB`}</div>
         <div  id="w-node-_4568d13b-a5d8-ee34-4eac-268dab9d3ae2-b1d416f8"  class="result-block-days">${e.validityPeriodInDays
            } days</div>
         <div  id="w-node-_4568d13b-a5d8-ee34-4eac-268dab9d3ae2-b1d416f8"  class="result-block-price-number">${currencySymbol} ${e.price}</div>
       </div>`)
        })
      }
    })
  } else {
    plansCount.style.display = "none"

    plansWrapper.insertAdjacentHTML("beforeend", `<div class="buy-plan_default-block"><div>Sorry, no plans are available for this region.</div></div>`)
  }
  initializeOnClicks()
  const allbuybtns = document.querySelectorAll("#search-section .buy-plan_button")
  allbuybtns.forEach(btn => {
    btn.style.display = "none"
  })
}

const initializeOnClicks = () => {
  const cards = document.querySelectorAll("#search-section .buy-plan_result-info-block")
  const tooltips = document.querySelectorAll("#tooltip")

  tooltips.forEach(tooltip => {
    tooltip.addEventListener("click" , () => {
      console.log('clicked')
      tooltipwrapper.style.display = 'flex'
      tooltipwrapper.style.opacity = 1
      
      const countryList = tooltip.getAttribute("data-list").split(',')
      updateModalHTML(countryList)
      
    })
  })

  cards.forEach(car => car.addEventListener("click", () => {
    console.log(car)
    car.parentElement.querySelectorAll(".buy-plan_result-info-block").forEach(e => e.classList.remove("selected"))
    car.classList.add("selected")
    const button = car.parentElement.parentElement.querySelector(".buy-plan_button")
    button.style.display = "block"
    console.log(button)
    button.href = `https://app.gigsky.com/#/buy-plan?pd=${car.getAttribute("data-code")}&nw=${car.getAttribute("data-id")}`
  }))
}

const updateModalHTML = (countryList) => {
  console.log('is called check')
  console.log(tooltipcountrylist , 'tooltipcountrylist')
  tooltipcountrylist.replaceChildren()
  
  countryList.forEach(country => {
    const countryBlock = document.createElement('div')
    const curr = countries.find(e => e.code == country)
    countryBlock.innerText = curr.name
    countryBlock.classList.add('country-block')
    countryBlock.addEventListener("click", () => { 
       loading = true
    loadingWrap.style.display = loading ? "block" : "none"
    plansCount.style.display = loading ? "none" : "block"
    plansWrapper.style.display = loading ? "none" : "flex"
      apiCall(country) 
      mainwrap.style.display = "block"
      tooltipwrapper.style.display = "none"
      tooltipwrapper.style.opacity = 0
    })
    tooltipcountrylist.append(countryBlock)
  })
  
}

//Gabi
//This has some basic utility functions, some could be very handy

export function get_current_date_string() {
    var cur_date = new Date();
    var dd = String(cur_date.getDate()).padStart(2, "0");
    var mm = String(cur_date.getMonth() + 1).padStart(2, "0");
    var yyyy = cur_date.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
}

export function get_current_timedate_string() {
    var cur_date = new Date();
    var ddmmyyyy = get_current_date_string();
    var hh = String(cur_date.getHours()).padStart(2, "0");
    var mm = String(cur_date.getMinutes()).padStart(2, "0");
    var ss = String(cur_date.getSeconds()).padStart(2, "0");

    return hh + ":" + mm + ":" + ss + "-" + ddmmyyyy;
}

export function get_dorm_info_from_dorm_id(dorm_id) {
    return dorm_data_table[dorm_id];
}

export function get_area_info_from_dorm_id(dorm_id) {
    return dorm_area_data_table[area_lookup[dorm_data_table[dorm_id].area]];
}

export function value_to_star_rating(value) {
    value = Number(value);
    if(value < 0) { value = 0; }
    if(value > 5) { value = 5; }
    value = Math.round(value);
    return "★".repeat(value) + "☆".repeat(5 - value);
    
}

const dorm_area_data_table = {
    northeast: {
        bg_image: "./assets/images/Northeast.jpg",
    },
    central: {
        bg_image: "./assets/images/Central.PNG",
    },
    north: {
        bg_image: "./assets/images/North.jpg",
    },
    sylvan: {
        bg_image: "./assets/images/Sylvan.jpg",
    },
    southwest: {
        bg_image: "./assets/images/Southwest.jpg",
    },
    honors: {
        bg_image: "./assets/images/Honors.jpg",
    },
    ohill: {
        bg_image: "./assets/images/OrchardHill.jpg",
    },
}

const area_lookup = {
    "Northeast": "northeast",
    "Central": "central",
    "North": "north",
    "Sylvan": "sylvan",
    "Southwest": "southwest",
    "Honors College": "honors",
    "Orchard Hill": "ohill",
}

const dorm_data_table = {
    //Northeast
    ne_crabtree: {
        name: "Crabtree Hall",
        area: "Northeast",
    },
    ne_dwight: {
        name: "Dwight Hall",
        area: "Northeast",
    },
    ne_hamlin: {
        name: "Hamlin Hall",
        area: "Northeast",
    },
    ne_johnson: {
        name: "Johnson Hall",
        area: "Northeast",
    },
    ne_knowlton: {
        name: "Knowlton Hall",
        area: "Northeast",
    },
    ne_leach: {
        name: "Leach Hall",
        area: "Northeast",
    },
    ne_lewis: {
        name: "Lewis Hall",
        area: "Northeast",
    },
    ne_marylyon: {
        name: "Mary Lyon Hall",
        area: "Northeast",
    },
    ne_thatcher: {
        name: "Thatcher Hall",
        area: "Northeast",
    },

    //North
    nor_a: {
        name: "North A Hall",
        area: "North",
    },
    nor_b: {
        name: "North A Hall",
        area: "North",
    },
    nor_c: {
        name: "North C Hall",
        area: "North",
    },
    nor_d: {
        name: "North D Hall",
        area: "North",
    },

    //Sylvan
    syl_mcnamara: {
        name: "McNamara Hall",
        area: "Sylvan",
    },
    syl_brown: {
        name: "Brown Hall",
        area: "Sylvan",
    },
    syl_cashin: {
        name: "Cashin Hall",
        area: "Sylvan",
    },

    //Orchard Hill
    oh_grayson: {
        name: "Grayson Hall",
        area: "Orchard Hill",
    },
    oh_dickinson: {
        name: "Dickinson Hall",
        area: "Orchard Hill",
    },
    oh_webster: {
        name: "Webster Hall",
        area: "Orchard Hill",
    },
    oh_field: {
        name: "Field Hall",
        area: "Orchard Hill",
    },

    //Central
    cen_brett: {
        name: "Brett Hall",
        area: "Central",
    },
    cen_brooks: {
        name: "Brooks Hall",
        area: "Central",
    },
    cen_wheeler: {
        name: "Wheeler Hall",
        area: "Central",
    },
    cen_baker: {
        name: "Baker Hall",
        area: "Central",
    },
    cen_gorman: {
        name: "Gorman Hall",
        area: "Central",
    },
    cen_greenough: {
        name: "Greenough Hall",
        area: "Central",
    },
    cen_chadbourne: {
        name: "Chadbourne Hall",
        area: "Central",
    },
    cen_vanmeter: {
        name: "Van Meter Hall",
        area: "Central",
    },
    cen_butterfield: {
        name: "Butterfield Hall",
        area: "Central",
    },

    //Honors
    hnr_birch: {
        name: "Birch Hall",
        area: "Honors College",
    },
    hnr_sycamore: {
        name: "Sycamore Hall",
        area: "Honors College",
    },
    hnr_elm: {
        name: "Elm Hall",
        area: "Honors College",
    },
    hnr_maple: {
        name: "Maple Hall",
        area: "Honors College",
    },
    hnr_oak: {
        name: "Oak Hall",
        area: "Honors College",
    },
    hnr_linden: {
        name: "Linden Hall",
        area: "Honors College",
    },

    //Southwest
    sw_cance: {
        name: "Cance Hall",
        area: "Southwest",
    },
    sw_coolidge: {
        name: "Coolidge Hall",
        area: "Southwest",
    },
    sw_crampton: {
        name: "Crampton Hall",
        area: "Southwest",
    },
    sw_emerson: {
        name: "Emerson Hall",
        area: "Southwest",
    },
    sw_james: {
        name: "James Hall",
        area: "Southwest",
    },
    sw_johnadams: {
        name: "John Adams Hall",
        area: "Southwest",
    },
    sw_johnquincy: {
        name: "John Quincy Hall",
        area: "Southwest",
    },
    sw_kennedy: {
        name: "Kennedy Hall",
        area: "Southwest",
    },
    sw_mackimmie: {
        name: "MacKimmie Hall",
        area: "Southwest",
    },
    sw_melville: {
        name: "Melville Hall",
        area: "Southwest",
    },
    sw_moore: {
        name: "Moore Hall",
        area: "Southwest",
    },
    sw_patterson: {
        name: "Patterson Hall",
        area: "Southwest",
    },
    sw_pierpoint: {
        name: "Pierpoint Hall",
        area: "Southwest",
    },
    sw_prince: {
        name: "Prince Hall",
        area: "Southwest",
    },
    sw_thoreau: {
        name: "Thoreau Hall",
        area: "Southwest",
    },
    sw_washington: {
        name: "Washington Hall",
        area: "Southwest",
    },
}

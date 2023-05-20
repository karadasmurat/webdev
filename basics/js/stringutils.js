function parseCookies() {

    const cookieString = "school=Hogwarts%20School%20of%20Witchcraft%20and%20Wizardry; lang=FR; rememberme=true";
    const cookies = {};
    const cookies1 = {};
    const kv_pairs = cookieString.split(";");
    for (let kv of kv_pairs) {

        // The array on the right-hand side of the equals sign is being destructured into two variables, 
        // name and value, which are assigned the first and second elements of the array, respectively.
        const [name, value] = kv.trim().split("=");

        cookies[name] = decodeURIComponent(value);

        // ERR Not variable name, but a fixed property name ! 
        // cookies.name = decodeURIComponent(value);    { name: 'true' }

    }

    console.log(cookies);





}


parseCookies();
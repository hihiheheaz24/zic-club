export default class ConfigsXoc {

    public static Login = {
        CoinXoc: 0,
        UsernameFish: '',
        PasswordFish: '',
        UserIdFish: '',
        FishConfigs: null,
        Coin: 0,
        Username: '',
        Password: '',
        Token: '',
        tokenXoc:'',
        Platform: 0,
        Balance: 0,
        Nickname: '',
        Avatar: 1,
        isLogined: false,
    };

    public static App = {
        USE_WSS: true,
        HOST: {
            // host: '172.31.39.110',
            // port: 82

            host: 'xocdia.boc1.one', //253-live
            //port: 2053
            port: 80
        },
        Password: '',

        IsSound: true,
        IsMusic: true,

        Debug: true,
    };

    static CPName = "";
}


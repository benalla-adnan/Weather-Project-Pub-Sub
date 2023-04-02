public with sharing class WeatherAPI {
    public WeatherAPI() {
    }

    

    @AuraEnabled(cacheable = true)
    public static string getWeatherInfo(String ville){
         String APIKEY_CONST = '2733d65b7b262fdc0f0a059b81f07e97';
          String ENDPOINT_CONST = 'https://api.openweathermap.org/data/2.5/weather?q='+ville+'&appid='+APIKEY_CONST;
        
            HttpRequest request = new HttpRequest();
            HttpResponse response = new HttpResponse();
            Http http = new Http();
            request.setEndpoint(ENDPOINT_CONST);
            request.setMethod('GET');
            response = http.send(request);
            if (response.getStatusCode() == 200) {
                String jsonResponse = response.getBody();
                return jsonResponse;
            } else{
                return 'Error';
            }

}
}
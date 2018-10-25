import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ErrorHandler } from '@angular/core';

//fucntion takes mock back end arguments just for demo 
export function fakeBackendFactory(
    backend: MockBackend, 
    options: BaseRequestOptions) {
        
  //extract from jwt.io
  // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNoYW4gTGVlIiwiYWRtaW4iOnRydWV9.obmYmMNESPR8361BuMWjOA7W8HQs6jJqArnai8jkO6U';

  // account with admin === false;
  let token: string;
    
  backend.connections.subscribe((connection: MockConnection) => {
    //Using the setTimeout() function to simulate an  asynchronous call to the server that takes 1 second. 
    setTimeout(() => {
      //
      // Fake implementation of /api/authenticate
      //

      //If user makes post request, parse the data.

      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());


        //if hard coded credential matches with user input, response with 200.
        if (body.email === 'chanethanlee@gmail.com' && body.password === '1234') { 
          token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNoYW4gTGVlIiwiYWRtaW4iOnRydWV9.obmYmMNESPR8361BuMWjOA7W8HQs6jJqArnai8jkO6U';
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
           })));
        } else if (body.email === 'kennethdu3@gmail.com' && body.password === '1234') { 
          token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkxIiwibmFtZSI6Iktlbm5ldGggRHUiLCJhZG1pbiI6ZmFsc2V9.aTzIHqehcVxLu61b_nXHx-0m1zdRpZzygWfyb4OBK_M';
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
           })));
        
        } else {
          //Bad user request.
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 401 })
          ));
        }
      }



       // 
       // Fake implementation of /api/orders
       //
        //Define end-point
       if (connection.request.url.endsWith('/api/orders') && 
           connection.request.method === RequestMethod.Get) {
             //check header of jwt if it has auth.
         if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
           //Real website will respond order object instead of 1,2,3
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: [1, 2, 3] })
         ));
       } else {
           connection.mockRespond(new Response(
             new ResponseOptions({ status: 401 })
           ));
       }
    }



    }, 1000);
    // 1 second past.
  });

  //create new http instance.(using two args, MockBackend/BaseRequestOption)
  return new Http(backend, options);
}

// app.moduel, consuming http service like
// {provide: ErrorHandler, useClass:AppErrorHandler}

// instead, you can use useFactory instead of use Class. (to create object, instance of http service)

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    //dependencies for factroy function
    deps: [MockBackend, BaseRequestOptions]
};
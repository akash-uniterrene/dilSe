/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		navigator.contacts.find([navigator.contacts.fieldType.displayName],gotContacts,errorHandler);
		
		document.querySelector("#sendMessage").addEventListener("click", function() {
			console.log("click");
			var number = document.querySelector("#number").value;
			var message = document.querySelector("#message").value;
			console.log("going to send "+message+" to "+number);

			//simple validation for now
			if(number === '' || message === '') return;

			var msg = {
				phoneNumber:number,
				textMessage:message
			};

			sms.send(msg, function(message) {
				
				console.log("success: " + message);
				navigator.notification.alert(
					'Message to ' + number + ' has been sent.',
					null,
					'Message Sent',
					'Done'
				);

			}, function(error) {
				console.log("error: " + error.code + " " + error.message);
				navigator.notification.alert(
					'Sorry, message not sent: ' + error.message,
					null,
					'Error',
					'Done'
				);
			});

		}, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function gotContacts(c) {
	alert();
	console.log("gotContacts, number of results "+c.length);
	for(var i=0, len=c.length; i<len; i++) {
		console.dir(c[i]);
	}
}

function errorHandler(e) {
	console.log("errorHandler: "+e);
}

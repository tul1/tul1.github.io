
function inheritPrototype(childObject, parentObject) {
    // basicamente, el objeto hijo copia a su prototype todas las propiedades del prototipo del padre, pero conserva su propio constructor

    var copyOfParent = Object.create(parentObject.prototype); // devuelve un objetos con las propiedades del pasado por parametro
    copyOfParent.constructor = childObject; // en el paso anterior, se copio parentObject.prototype.contructor ---> a ---> copyOfParent
    // pero nosotros queremos heredar todas las propiedades, excepto el constructor del padre
    // por eso lo reemplazamos por el constructor del hijo

    childObject.prototype = copyOfParent;   // finalmente este es el nuevo prototype del hijo

}


/*  Agregar 3 funciones al prototype para manejar eventos   addEventListener, removeEventListener y dispatchEvent  */
function addEventsHandlingFunctions(obj) {

    obj._listerners=Object.create(null);
    /**
     * Adds an event listener to this Acceleration Module.
     * @param {string} type The name of the command.
     * @param handler The handler for the cmomand. This is called whenever the command is received.
     */
    var addEventListener = function (type, handler) {
        if (!this._listerners) {
            this._listerners = Object.create(null);
        }
        if (!(type in this._listerners)) {
            this._listerners[type] = [handler];
        } else {
            var handlers = this._listerners[type];
            if (handlers.indexOf(handler) < 0) {
                handlers.push(handler);
            }
        }
    }

    /**
     * Removes an event listener from this Acceleration Module.
     * @param {string} type The name of the command.
     * @param handler The handler for the cmomand. This is called whenever the command is received.
     */
    var removeEventListener = function (type, handler) {
        if (!this._listerners) {
            // No listeners
            return;
        }
        if (type in this._listerners) {
            var handlers = this._listerners[type];
            var index = handlers.indexOf(handler);
            if (index >= 0) {
                if (handlers.length == 1) {
                    // Listeners list would be empty, delete it
                    delete this._listerners[type];
                } else {
                    // Remove the handler
                    handlers.splice(index, 1);
                }
            }
        }
    }
    var dispatchEvent = function (event) {
        if (!this._listerners) {
            return true;
        }
        var type = event.type;
        if (type in this._listerners) {
            // Make a copy to walk over
            var handlers = this._listerners[type].concat();
            for (var i = 0, handler; handler = handlers[i]; i++) {
                handler.call(this, event);
            }
        }
    }
	
	if (obj.prototype){
			obj.prototype.addEventListener=addEventListener;
		obj.prototype.removeEventListener=removeEventListener;
		obj.prototype.dispatchEvent=dispatchEvent;
	} else {
		console.log("addEventsHandlingFunctions() ERROR, el objeto no tiene la 'prototype' ");
	}

}

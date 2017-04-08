package com.wits.core

class Register {
 
    String password, email, firstName, lastName, mobile, gender

    static constraints = {
        password size: 5..15, blank: false, password: true		
        email email: true, blank: false, unique:true
    } 
}

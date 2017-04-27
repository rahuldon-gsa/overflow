package com.wits.core

class Account {

	String type, state, source, salary, num
	String address1, address2, city, zipCode
	Date dateOfBirth
    BigDecimal balance

    static constraints = {	
        num blank: false, unique:true
    } 
}

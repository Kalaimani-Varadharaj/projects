package com.demo.levelzero;

import java.util.Scanner;

public class HackathonOne {
	
	public boolean checkMessage(String message) {
		
		//Rule 1
		int hashIndex = message.indexOf('#');
		int hashCount =0;
		for(int i =0; i<message.length(); i++) {
			if(message.charAt(i) == '#') {
				hashCount++;
			}
		}
		if(hashCount !=1 && message.charAt(1) !='#') {
			return false;
		}
		
		
		//rule 2
		int dolarCount = 0;
		for(int i=0; i<message.length(); i++) {
			if(message.charAt(i) == '$') {
				dolarCount++;
			}
		}
		
		int dolarIndex = message.indexOf('$');
		if(dolarCount !=0  || dolarIndex !=-1 || dolarIndex < hashIndex) {
			return false;
		}
		
		//String s1 = "";
		int count =0;
		for(int i=0; i<message.length(); i++) {
			if(message.charAt(i) == 'A'||message.charAt(i) == 'E'||message.charAt(i) == 'I'||
					message.charAt(i) == 'O'||message.charAt(i) == 'U') {
				count++;
			}
		}
		
		if(!message.endsWith("WYR")&&(count%2 !=0) || (!message.endsWith("PWQ") && (count%2 == 0))) {
			return false;
		}
		
		return true;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		HackathonOne obj = new HackathonOne();
		
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the message");
		String s1 = sc.nextLine();
		s1 = s1.toUpperCase();
		
		System.out.println(obj.checkMessage(s1));
		
		if(obj.checkMessage(s1)) {
			System.out.println("Message Valid");
		}
		else {
			System.out.println("Message Invalid");
		}

	}

}

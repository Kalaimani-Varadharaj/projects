package com.demo.levelzero;

import java.util.Scanner;

public class HackathonZero {

	//1.
	public void checkNumberMultiple(long n1, int n2) {
		String num = "";
		int temp =0;
		int r =0;
		while (n1 > 0) {
			r = (int) n1 % 10;
			if (r % n2 == 0) {
				num += r;
			}
			n1 /= 10;
		}
		System.out.println(num);
	}

	//2.
	public void stringTransformer(String s1) {
		char[] charArray = s1.toCharArray();
		String s2 = "";
		String s3 = "";
		
		for (int i = 0; i < charArray.length; i++) {
			if (i % 2 == 0) {
				s2 += charArray[i];
			} else if ((i % 2 != 0) && (charArray[i] != 'a' || charArray[i] != 'A' || charArray[i] != 'e'
					|| charArray[i] != 'E' || charArray[i] != 'i' || charArray[i] != 'I' || charArray[i] != 'o'
					|| charArray[i] != 'O' || charArray[i] != 'u' || charArray[i] != 'U')) {
				
				s3 += charArray[i];
			}
		}
		String s4 = s2.concat(s3);
		System.out.println("s2=" + s2 + " s3=" + s3 + " s4=" + s4);
	}
	
	//3.(A, S,H , U, Z)
	public void pickMagicWords(String sentence) {
		String s = sentence.toLowerCase();
		String[] splitString  = s.split(" ");
		StringBuilder sb = new StringBuilder();
		
		for(int i=0; i<=splitString.length; i++) {
			if(splitString[i].charAt(i) == 'a' || splitString[i].charAt(i) == 's' || 
					splitString[i].charAt(i)=='h' || splitString[i].charAt(i) == 'u' ||
					splitString[i].charAt(i) == 'z') {
				sb.append(splitString[i]);
			}
		}
		System.out.println(sb);
		
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Scanner sc = new Scanner(System.in);
		HackathonZero obj = new HackathonZero();

		// 1. inputs for check number multiple method
		System.out.println("Enter the number N1:");
		long n1 = sc.nextLong();

		System.out.println("Enter the number N2:");
		int n2 = sc.nextInt();

		// accessing checkNumberMultiple method using object
		obj.checkNumberMultiple(n1, n2);

		// 2. Input for string transformer method
//		System.out.println("Enter the string");
//		String s1 = sc.nextLine();
//		obj.stringTransformer(s1);
//		
//		System.out.println("Enter the sentence");
//		String sentence = sc.nextLine();
//		
//		obj.pickMagicWords(sentence);

	}

}

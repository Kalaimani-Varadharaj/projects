package com.demo.levelzero;

import java.util.Scanner;

public class HackathonTwo {
	
	public void loadMatrix(int s1, int s2, char[][] arr, String word) {
		
		for(int i = 0; i<s1; i++) {
			for(int j=0; j<s2; j++) {
				for(int k=0; k<word.length(); k++) {
					if(i==j) {
						arr[i][j] = word.charAt(i);
					}
					if((i+j)==3) {
						arr[i][j] = word.charAt(i);
					}
				}
			}
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the size of the row");
		int s1 = sc.nextInt();
		
		System.out.println("Enter the size of the column");
		int s2 = sc.nextInt();
		
		System.out.println("Enter the word");
		String word = sc.next();
		
		char[][] arr = new char[s1][s2];
		System.out.println("Enter the character elements");
		for(int i=0; i<s1; i++) {
			for(int j=0; j<s2; j++) {
				arr[i][j] = sc.next().charAt(0);
			}
		}
				

	}

}

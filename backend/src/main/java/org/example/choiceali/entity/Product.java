package org.example.choiceali.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class Product {
    String name;
    String amount;
    String image;
    String link;
    String price;
   boolean choice;
}

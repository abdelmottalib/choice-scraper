package org.example.choiceali.controller;


import org.example.choiceali.entity.Product;
import org.example.choiceali.service.ScrapperService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/scrapper")
public class ScrapperController {


    private final ScrapperService scrapperService;
    ScrapperController(ScrapperService scrapperService) {
        this.scrapperService = scrapperService;
    }
    @GetMapping("{product}")
    public List<Product> getScrappedProduct(@PathVariable String product) {
        
        return scrapperService.scrapeProduct(product);
    }
}

package org.example.choiceali.service;
import org.example.choiceali.entity.Product;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;


@Service
public class ScrapperService {
    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
    private static final String REFERRER = "https://www.google.com";
    private final ArrayList<Product> choiceProducts = new ArrayList<>();
    private final static Integer NUMBER_PAGES = 10;
    private  Document document;
    public void connect(String url) throws IOException {
        this.document = Jsoup.connect(url)
                .userAgent(USER_AGENT)
                .referrer(REFERRER)
                .timeout(5000)
                .get();
    }
    public String makeLinks(String url) {
        return "http//" + url;
    }
    private String buildAliexpressUrl(String productName, int page) {
        return UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("www.aliexpress.com")
                .path("/w/wholesale-" + productName + ".html")
                .queryParam("page", page)
                .build()
                .toUriString();
    }

    public ArrayList<Product> scrapeProduct(String searchedProductName) {
        ExecutorService executorService = Executors.newFixedThreadPool(NUMBER_PAGES);
        List<Future<ArrayList<Product>>> futures = new ArrayList<>();

        for (int i = 0; i <= NUMBER_PAGES; i++) {
            String url = buildAliexpressUrl(searchedProductName, i);
            futures.add(executorService.submit(() -> {
                try {
                    connect(url);
                    System.out.println(document);
                    return extractProducts();
                } catch (IOException e) {
                    e.printStackTrace();
                    return new ArrayList<>();
                }
            }));
        }

        ArrayList<Product> allProducts = new ArrayList<>();
        for (Future<ArrayList<Product>> future : futures) {
            try {
                allProducts.addAll(future.get());
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }

        executorService.shutdown();
        System.out.println(allProducts.size());
        return allProducts;
    }

    private ArrayList<Product> extractProducts() {
        Elements products = document.select("div.search-item-card-wrapper-gallery");
        for (Element product : products) {
            boolean choice = product.select("img[src='https://ae01.alicdn.com/kf/S1887a285b60743859ac7bdbfca5e0896Z/154x64.png']").size()>0;
            if (choice) {
                String image = product.select("img").attr("src");
                image = makeLinks(image.substring(2));
                String productLink = product.select("a").attr("href");
                productLink = makeLinks(productLink.substring(2));
                Element soldSpan = product.select("span:containsOwn(sold)").first();
                String amountSold = soldSpan != null ? soldSpan.text() : "N/A";
                String productName = product.select("h3").first().text();
                Elements priceSpans = product.select("span[style*=currency-symbol:MAD]");
                StringBuilder priceBuilder = new StringBuilder();
                for (Element priceSpan : priceSpans) {
                    priceBuilder.append(priceSpan.text());
                }
                priceBuilder.replace(0,3, "").append(" MAD");
                String completePrice = priceBuilder.toString();
                Product element = Product.builder().name(productName).link(productLink).image(image).amount(amountSold).price(completePrice).build();
                choiceProducts.add(element);
            }
        }
        return choiceProducts;
    }
}

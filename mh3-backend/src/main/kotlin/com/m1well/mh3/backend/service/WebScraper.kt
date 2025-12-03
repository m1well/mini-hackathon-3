package com.m1well.mh3.backend.service

import org.jsoup.Jsoup
import org.springframework.stereotype.Service

@Service
class WebScraper {

    fun fetchTextFromUrl(url: String): String {
        return try {
            val doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36")
                .timeout(10000)
                .get()

            // get html body
            doc.body().text()
        } catch (e: Exception) {
            throw IllegalArgumentException("Konnte URL nicht lesen: ${e.message}", e)
        }
    }
}

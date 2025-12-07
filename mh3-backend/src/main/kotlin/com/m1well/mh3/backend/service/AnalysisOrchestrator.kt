package com.m1well.mh3.backend.service

import com.m1well.mh3.backend.dto.AnalysisResultDto
import com.m1well.mh3.backend.dto.JobAnalyzeRequestDto
import com.m1well.mh3.backend.exception.WebScrapingException
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

private val logger = KotlinLogging.logger {}

@Service
class AnalysisOrchestrator(
    private val webScraper: WebScraper,
    private val openAiService: OpenAiService,
    private val userService: UserService,
    @Value("\${spring.ai.openai.api-key:}") private val openaiApikey: String
) {

    fun startAnalysis(userCode: String, dto: JobAnalyzeRequestDto): AnalysisResultDto? {
        val userFromDb = userService.getUserForCode(userCode)

        var textToAnalyze: String

        val analyzedViaUrl = isAnalyzeModeUrl(dto)

        if (analyzedViaUrl) {
            try {
                // webscraping with given url
                val rawText = webScraper.fetchTextFromUrl(dto.url!!)
                logger.info { "Webscraping successfull - characters: ${rawText.chars().count()}" }

                // shorten the text for safety reasons (safe some tokens if needed)
                textToAnalyze = rawText.take(12_000)
            } catch (e: IllegalArgumentException) {
                logger.error { "Error during webscraping..." }
                throw WebScrapingException("Fehler beim Webscraping - diese URL kann leider nicht verarbeitet werden!")
            }
        } else {
            textToAnalyze = dto.manualText!!
        }

        if (openaiApikey.isBlank() || openaiApikey.equals("dummy")) {
            logger.info { "Mock result because openai apikey not available...." }
            return createMockResult(analyzedViaUrl, dto.url)
        } else {
            return openAiService.fireAiRequest(textToAnalyze, analyzedViaUrl, dto.url, userFromDb)
        }
    }

    private fun createMockResult(analyzedViaUrl: Boolean, url: String?): AnalysisResultDto {
        return AnalysisResultDto(
            uniqueKey = "",
            title = "Softeare Developer",
            company = "Mustermann AG",
            analyzedViaUrl = analyzedViaUrl,
            location = "Stuttgart",
            summary = """
                [MOCK] Dies ist eine simulierter Zusammenfassung. Wir suchen einen Senior Developer der Kotlin mag.
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet 
                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labor
            """.trimIndent(),
            techstack = mutableListOf("Kotlin", "Spring Boot", "Angular", "Docker", "Git"),
            tasks = "",
            workingModel = "",
            experience = "",
            benefits = "",
            culture = "",
            salaryRange = null,
            matchScore = 80,
            matchReasoning = "[MOCK] Passt super, weil Mock-Daten immer passen :)",
            urlJob = url,
        )
    }

    private fun isAnalyzeModeUrl(dto: JobAnalyzeRequestDto) = dto.run {
        !url.isNullOrBlank() && manualText.isNullOrBlank()
    }

}

package com.m1well.mh3.backend.service

import com.m1well.mh3.backend.dto.AnalysisResultDto
import com.m1well.mh3.backend.dto.UserViewResponseDto
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.ai.chat.client.ChatClient
import org.springframework.ai.chat.prompt.Prompt
import org.springframework.ai.chat.prompt.PromptTemplate
import org.springframework.ai.chat.prompt.SystemPromptTemplate
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service

private val logger = KotlinLogging.logger {}

@Service
class OpenAiService(val chatClientBuilder: ChatClient.Builder) {

    @Value("classpath:prompts/userMessageTemplate.st")
    private lateinit var userMessageTemplate: Resource

    @Value("classpath:prompts/systemMessageTemplate.st")
    private lateinit var systemMessageTemplate: Resource

    fun fireAiRequest(jobDescriptionChaos: String, user: UserViewResponseDto): AnalysisResultDto? {
        val promptParams: HashMap<String, Any> = hashMapOf(
            "currentJobTitle" to user.currentJobTitle,
            "experienceYears" to user.experienceYears,
            "mainTechStack" to (user.techstack?.joinToString(",") ?: "Keine Angaben"),
            "preferences" to user.preferences,
            "job" to jobDescriptionChaos
        )
        val userMessage = PromptTemplate(userMessageTemplate).createMessage(promptParams)
        val systemMessage = SystemPromptTemplate(systemMessageTemplate).createMessage()

        logger.info { jobDescriptionChaos }

        return chatClientBuilder.build()
            .prompt(Prompt(listOf(userMessage, systemMessage)))
            .call()
            .entity(AnalysisResultDto::class.java)
    }

}

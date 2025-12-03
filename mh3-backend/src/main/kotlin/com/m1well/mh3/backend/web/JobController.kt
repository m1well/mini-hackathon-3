package com.m1well.mh3.backend.web

import com.m1well.mh3.backend.dto.JobAnalyzeRequestDto
import com.m1well.mh3.backend.dto.JobSaveRequestDto
import com.m1well.mh3.backend.dto.JobUpdateRequestDto
import com.m1well.mh3.backend.service.AnalysisOrchestrator
import com.m1well.mh3.backend.service.JobService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/job")
class JobController(private val service: JobService, private val analysis: AnalysisOrchestrator) {

    @GetMapping("/{userCode}")
    fun getAllJobsForUser(@PathVariable userCode: String) =
        ResponseEntity.ok(service.getAllJobsForUser(userCode))

    @PostMapping("/{userCode}")
    fun saveJob(@PathVariable userCode: String, @RequestBody request: JobSaveRequestDto) =
        ResponseEntity.status(201).body(service.saveJob(userCode, request))

    @PutMapping("/{userCode}")
    @ResponseStatus(HttpStatus.CREATED)
    fun updateJob(@PathVariable userCode: String, @RequestBody request: JobUpdateRequestDto) =
        ResponseEntity.ok(service.updateJob(userCode, request))

    @PostMapping("/{userCode}/analyze")
    fun analyzeJob(@PathVariable userCode: String, @RequestBody request: JobAnalyzeRequestDto) =
        ResponseEntity.ok(analysis.startAnalysis(userCode, request))

}

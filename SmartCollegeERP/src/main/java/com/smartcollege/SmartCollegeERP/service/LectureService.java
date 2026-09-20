package com.smartcollege.SmartCollegeERP.service;

import com.smartcollege.SmartCollegeERP.model.Lecture;
import com.smartcollege.SmartCollegeERP.repository.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LectureService {

    private final LectureRepository lectureRepository;

    public Lecture createLecture(Lecture lecture){
        return lectureRepository.save(lecture);
    }

    public List<Lecture> getLecturesByCourse(String courseId){
        return lectureRepository.findByCourseIdOrderByOrderAsc(courseId);
    }

    public void deleteLecture(String lectureId){
        lectureRepository.deleteById(lectureId);
    }
    public Lecture updateLecture(String lectureId, Lecture updatedLecture) {

        Lecture lecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new RuntimeException("Lecture not found"));

        lecture.setTitle(updatedLecture.getTitle());
        lecture.setVideoUrl(updatedLecture.getVideoUrl());
        lecture.setPdfUrl(updatedLecture.getPdfUrl());
        lecture.setOrder(updatedLecture.getOrder());

        return lectureRepository.save(lecture);
    }
}
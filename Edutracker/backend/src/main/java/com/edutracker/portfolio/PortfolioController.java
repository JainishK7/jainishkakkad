package com.edutracker.portfolio;

import com.edutracker.activity.ActivityRepository;
import com.edutracker.student.StudentProfileRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final StudentProfileRepository students;
    private final ActivityRepository activities;

    public PortfolioController(StudentProfileRepository students, ActivityRepository activities) {
        this.students = students; this.activities = activities;
    }

    @GetMapping("/pdf/{studentId}")
    public ResponseEntity<byte[]> pdf(@PathVariable Long studentId) throws Exception {
        var student = students.findById(studentId).orElseThrow();
        var acts = activities.findByStudentId(studentId);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document doc = new Document(PageSize.A4);
        PdfWriter.getInstance(doc, out);
        doc.open();

        Font title = new Font(Font.HELVETICA, 18, Font.BOLD);
        Font normal = new Font(Font.HELVETICA, 11);

        doc.add(new Paragraph("EduTracker Verified Portfolio", title));
        doc.add(new Paragraph("Name: " + student.getUser().getFullName(), normal));
        doc.add(new Paragraph("Program: " + student.getProgram() + " | Dept: " + student.getDepartment(), normal));
        doc.add(new Paragraph("CGPA: " + student.getCgpa() + " | Attendance: " + student.getAttendancePercent() + "% | Credits: " + student.getCreditPoints(), normal));
        doc.add(new Paragraph(" "));

        for (var a : acts) {
            doc.add(new Paragraph(a.getType() + " - " + a.getTitle(), new Font(Font.HELVETICA, 12, Font.BOLD)));
            if (a.getDescription() != null) doc.add(new Paragraph(a.getDescription(), normal));
            doc.add(new Paragraph("Status: " + a.getStatus(), normal));
            doc.add(new Paragraph(" "));
        }

        doc.close();
        byte[] bytes = out.toByteArray();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=portfolio_" + studentId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(bytes);
    }
}

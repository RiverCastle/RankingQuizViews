package Jesus.Deciples.RankingQuizView.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping("/home")
    public String getHomePage() {
        return "home.html";
    }

    @GetMapping("/quiz")
    public String getQuizPage() {
        return "quiz.html";
    }
}

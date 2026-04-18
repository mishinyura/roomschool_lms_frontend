
import programList from "@/mocks/back/get-program-list.json";
import topic1 from "@/mocks/back/get-topic-701.json";
import topic2 from "@/mocks/back/get-topic-702.json";
import topic3 from "@/mocks/back/get-topic-703.json";
import topic4 from "@/mocks/back/get-topic-704.json";
import topic5 from "@/mocks/back/get-topic-705.json";
import topic6 from "@/mocks/back/get-topic-706.json";
import topicPlaybar from "@/mocks/back/get-topic-playbar.json";

export const educationApi = {

    async getTopicPlaybar(topicSlug) {
        console.log("Иммитация вызова получения бара темы", topicSlug)
        return topicPlaybar
    },

    async getLesson(lessonSlug) {
        console.log("Иммитация вызова получения урока", lessonSlug)
        if (lessonSlug === "what-is-law") {
            return topic1
        } else if (lessonSlug === "difference-from-morality") {
            return topic2
        } else if (lessonSlug === "law-as-main-source-of-law") {
            return topic3
        } else if (lessonSlug === "hierarchy-of-laws") {
            return topic4
        } else if (lessonSlug === "main-codes-of-russia") {
            return topic5
        } else if (lessonSlug === "practice-with-ai-mentor") {
            return topic6
        }
    },

    async getPrograms() {
        console.log("Иммитация вызова получения программ");
        return programList
    },
    
    // async getVideo(lessonSlug) {
    //     console.log("Иммитация вызова получения видео");
    // },
};
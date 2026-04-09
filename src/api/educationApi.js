
import topic from "@/mocks/back/get-topic-701.json";
import topic2 from "@/mocks/back/get-topic-703.json";
import topicPlaybar from "@/mocks/back/get-topic-playbar.json";

export const educationApi = {

    async getTopicPlaybar(topicSlug) {
        console.log("Иммитация вызова получения бара темы", topicSlug)
        return topicPlaybar
    },

    async getLesson(lessonID) {
        console.log("Иммитация вызова получения урока", lessonID)
        if (lessonID === 703) {
            return topic2
        }
        
        return topic
    }
};
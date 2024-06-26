package store.dalkak.api.global.config;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import store.dalkak.api.cocktail.service.CocktailService;
import store.dalkak.api.global.elastic.dto.ElasticDto;
import store.dalkak.api.global.elastic.service.ElasticService;

@Component
@RequiredArgsConstructor
@Slf4j
public class SchedulingConfig {

    private final CocktailService cocktailService;

    private final ElasticService elasticService;

    private final Logger heartLogger = LoggerFactory.getLogger("heart-log");

    private final Logger viewLogger = LoggerFactory.getLogger("view-log");

    // 현재 인기있는 칵테일 순위
    @Scheduled(cron = "0 0 */6 * * *") // 매 6시간마다 실행 (초, 분, 시, 일, 월, 요일)
    public void executeTask() {
        List<ElasticDto> viewLogList = elasticService.findAllElasticLog("week", "view-log");
        List<ElasticDto> heartLogList = elasticService.findAllElasticLog("week", "heart-log");
        cocktailService.modifyRank(viewLogList, heartLogList);
    }

    // 좋아요 Count, Match를 Database에 입력
    @Scheduled(cron = "0 5 * * * *") // 정각의 5분마다
    public void migrateHeartToDatabase() {
        cocktailService.migrateHeart();
    }

    // 조회수 Count를 Database에 입력
    @Scheduled(cron = "0 0 12 * * ?") // 하루마다, 정오에
    public void migrateViewToDatabase() {
        List<ElasticDto> viewLogList = elasticService.findAllElasticLog("day", "view-log");
        cocktailService.migrateView(viewLogList);
    }

}

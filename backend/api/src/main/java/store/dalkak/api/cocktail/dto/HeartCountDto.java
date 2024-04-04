package store.dalkak.api.cocktail.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HeartCountDto {

    String id;
    String cockatailId;
    String count;
}

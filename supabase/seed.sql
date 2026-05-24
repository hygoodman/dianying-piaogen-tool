insert into public.movies (
  id, title, original_title, poster_url, release_year, genre, country, director, description, rating, duration
) values
  ('starbound', '星际归途', 'Starbound', '/posters/starbound.svg', 2024, array['科幻', '冒险'], '中国', '林诺', '一支深空返航小队穿越失联星门，在陌生星海中寻找回家的坐标。', 9.1, 142),
  ('echoes', '深海回声', 'Echoes', '/posters/echoes.svg', 2024, array['剧情', '悬疑'], '中国', '陈默', '潜水员在海底遗址中听见十年前失踪者的求救声，真相随潮汐浮出水面。', 8.7, 136),
  ('mist-city', '迷雾之城', 'Mist City', '/posters/mist-city.svg', 2024, array['悬疑', '犯罪'], '中国', '赵舟', '雨夜城市里连续出现的红光线索，将一名刑警带回未结旧案。', 8.3, 128),
  ('last-confession', '最后的告白', 'The Last Confession', '/posters/last-confession.svg', 2024, array['爱情', '剧情'], '中国', '苏念', '一封迟到的信，把两段人生重新推到同一座城市的晨光里。', 8.0, 118),
  ('moon-letter', '月球来信', 'Moon Letters', '/posters/moon-letter.svg', 2024, array['科幻', '爱情'], '中国', '沈一', '月面基地最后一名工程师，用无线电向地球发送没有收件人的情书。', 7.8, 125),
  ('homebound-train', '归途列车', 'Homebound Train', '/posters/homebound-train.svg', 2023, array['剧情', '家庭'], '中国', '周南', '一趟跨年列车上，几位陌生人把没说出口的告别讲给了彼此。', 7.6, 109)
on conflict (id) do update set
  title = excluded.title,
  original_title = excluded.original_title,
  poster_url = excluded.poster_url,
  release_year = excluded.release_year,
  genre = excluded.genre,
  country = excluded.country,
  director = excluded.director,
  description = excluded.description,
  rating = excluded.rating,
  duration = excluded.duration;

insert into public.ticket_templates (
  id, name, style_key, preview_url, background_style, accent_color
) values
  ('classic', '经典电影票', 'classic', '', 'linear-gradient(135deg, #ead4ad, #d2aa72)', '#b98431'),
  ('black-gold', '黑金纪念版', 'black-gold', '', 'linear-gradient(135deg, #101010, #2d2418)', '#d7a34d'),
  ('vintage', '复古纸质票', 'vintage', '', 'linear-gradient(135deg, #c89a74, #e2bd95)', '#8b5536')
on conflict (id) do update set
  name = excluded.name,
  style_key = excluded.style_key,
  preview_url = excluded.preview_url,
  background_style = excluded.background_style,
  accent_color = excluded.accent_color;

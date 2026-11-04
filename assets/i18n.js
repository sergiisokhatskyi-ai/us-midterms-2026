/* Interface language: browser locale by default; optional saved manual override.
   Russian is the original UI source. Data from public APIs is never fabricated. */
(()=>{'use strict';
const P=[
['ВЫБОРЫ США','ВИБОРИ США','US ELECTIONS'],
['Язык интерфейса','Мова інтерфейсу','Interface language'],
['3 ноября 2026 · Midterm elections','3 листопада 2026 · Проміжні вибори','November 3, 2026 · Midterm elections'],
['Результаты по штатам','Результати за штатами','Results by state'],
['Проценты подсчитанных голосов за демократов и республиканцев. Данные обновляются при открытии страницы и автоматически, пока она открыта.','Частки підрахованих голосів за демократів і республіканців. Дані оновлюються під час відкриття сторінки та автоматично, поки вона відкрита.','Shares of counted votes for Democrats and Republicans. Data refreshes when you open the page and automatically while it remains open.'],
['Обновить результаты','Оновити результати','Refresh results'],
['Тип выборов','Тип виборів','Election type'],
['Сенат США','Сенат США','US Senate'],
['Сенат','Сенат','Senate'],
['35 гонок','35 перегонів','35 races'],
['Палата представителей','Палата представників','House of Representatives'],
['435 округов','435 округів','435 districts'],
['Губернаторы','Губернатори','Governors'],
['Губернатор','Губернатор','Governor'],
['36 гонок','36 перегонів','36 races'],
['Polymarket — рыночные вероятности','Polymarket — ринкові ймовірності','Polymarket — market probabilities'],
['Сенат, Палата представителей и ключевые выборы по штатам · котировки с автоматическим обновлением','Сенат, Палата представників і ключові вибори в штатах · котирування з автоматичним оновленням','Senate, House and key state races · automatically refreshed odds'],
['Котировки Polymarket','Котирування Polymarket','Polymarket odds'],
['Подключение к Polymarket…','Підключення до Polymarket…','Connecting to Polymarket…'],
['Обновление Polymarket…','Оновлення Polymarket…','Refreshing Polymarket…'],
['Указана цена контракта «Yes», выраженная в %. Это оценки участников рынка, ','Показано ціну контракту «Yes» у %. Це оцінки учасників ринку, ','The displayed “Yes” contract price is expressed as a percentage. These are market participants’ estimates, '],
['не процент голосов','не відсоток голосів','not vote percentages'],
[', не данные опросов и не гарантии исхода. Котировки разных исходов могут не давать ровно 100%.',', а не результати опитувань чи гарантії результату. Сума котирувань різних результатів може відрізнятися від 100%.',', not poll results or guarantees. Prices for different outcomes may not add up to exactly 100%.'],
['Котировки по 11 ключевым штатам','Котирування для 11 ключових штатів','Odds for 11 key states'],
['Источник котировок: Polymarket ↗','Джерело котирувань: Polymarket ↗','Odds source: Polymarket ↗'],
[' · Публичный API Gamma. При сбое подключения показывается последняя доступная копия с отметкой времени.',' · Публічний API Gamma. Якщо з’єднання недоступне, показується остання доступна копія з позначкою часу.',' · Public Gamma API. If the connection fails, the latest available cached data is shown with its timestamp.'],
['Ключевые показатели','Ключові показники','Key metrics'],
['Подсчитанные голоса','Підраховані голоси','Votes counted'],
['В выбранной категории','У вибраній категорії','In the selected category'],
['Демократы','Демократи','Democrats'],
['Республиканцы','Республіканці','Republicans'],
['Нет опубликованных голосов','Немає оприлюднених голосів','No reported votes'],
['Штатов с подсчётом','Штатів із підрахунком','States reporting'],
['Гонки с опубликованными результатами','Перегони з оприлюдненими результатами','Races reporting results'],
['Проверка источника результатов…','Перевірка джерела результатів…','Checking results source…'],
['Досрочное голосование','Дострокове голосування','Early voting'],
['Статистика досрочного голосования','Статистика дострокового голосування','Early-voting statistics'],
['Опубликованные данные о количестве уже поданных бюллетеней — не подсчёт за партии','Оприлюднені дані про кількість уже поданих бюлетенів — не голоси за партії','Reported early ballots cast — not votes for parties'],
['Загрузка…','Завантаження…','Loading…'],
['Всего бюллетеней','Усього бюлетенів','Total ballots'],
['Очно досрочно','Достроково особисто','Early in-person'],
['По почте','Поштою','Mail ballots'],
['Получаем статистику досрочного голосования. Она обновляется отдельно от результатов выборов.','Отримуємо статистику дострокового голосування. Її оновлюють окремо від результатів виборів.','Fetching early-voting statistics. These update separately from election results.'],
['Статистика досрочного голосования по 50 штатам','Статистика дострокового голосування в 50 штатах','Early voting across all 50 states'],
['Штат','Штат','State'],
['Бюллетени','Бюлетені','Ballots'],
['Рег. D','Реєстр. D','Reg. D'],
['Рег. R','Реєстр. R','Reg. R'],
['Рег. D/R — партия, с которой зарегистрирован избиратель, если штат публикует эти сведения. Это НЕ голоса за кандидатов. Пустая ячейка — нет данных. Суммы категорий разных штатов могут не совпадать с национальным итогом.','Реєстр. D/R — партійна належність виборця за реєстрацією, якщо штат публікує ці дані. Це НЕ голоси за кандидатів. Порожня клітинка означає брак даних. Суми категорій за штатами можуть не збігатися із загальнонаціональним підсумком.','Reg. D/R indicates voters’ registered party affiliation where reported. These are NOT votes for candidates. Blank means no data. State category totals may not equal the national total.'],
['Карта США','Карта США','US map'],
['Выберите штат, чтобы посмотреть подробности','Виберіть штат, щоб переглянути подробиці','Select a state to see details'],
['Интерактивная карта штатов США','Інтерактивна карта штатів США','Interactive US state map'],
['50 штатов','50 штатів','50 states'],
['Лидирует D','Лідирує D','D leading'],
['Лидирует R','Лідирує R','R leading'],
['Равенство','Рівність','Tied'],
['Нет данных / выборов','Немає даних / виборів','No data / race'],
['Цвет отражает только текущее лидерство по опубликованным голосам, а не прогноз победы. Аляска и Гавайи показаны отдельно.','Колір позначає лише поточне лідерство за оприлюдненими голосами, а не прогноз перемоги. Аляску та Гаваї показано окремо.','Colours show only the current lead in reported votes, not a winner prediction. Alaska and Hawaii are shown separately.'],
['Доли голосов','Частки голосів','Vote shares'],
['Только уже опубликованные результаты','Лише вже оприлюднені результати','Reported results only'],
['Голосование в выбранной категории','Голосування у вибраній категорії','Voting in selected category'],
['Соотношение голосов','Співвідношення голосів','Vote distribution'],
['Учитываются только гонки и кандидаты, по которым опубликованы голоса. Это ','Враховано лише перегони та кандидатів, за якими оприлюднено голоси. Це ','Only races and candidates with reported votes are included. This is '],
['не','не','not'],
[' общенациональный опрос и не распределение мест в Конгрессе.',' не загальнонаціональне опитування і не розподіл місць у Конгресі.',' not a national poll or the distribution of seats in Congress.'],
['Обновление и прозрачность','Оновлення та прозорість','Updates and transparency'],
['Последняя проверка:','Остання перевірка:','Last checked:'],
['Время данных:','Час даних:','Data timestamp:'],
['Канал:','Канал:','Source channel:'],
['Состояние:','Стан:','Status:'],
['Нет данных','Немає даних','No data'],
['Источники','Джерела','Sources'],
['Открытый поток результатов','Відкритий потік результатів','Open results feed'],
['Как читать результаты','Як читати результати','How to read results'],
['Разбивка по штатам','Розподіл за штатами','State breakdown'],
['Проценты от опубликованных голосов в данном штате','Відсотки від оприлюднених голосів у цьому штаті','Percentages of reported votes in each state'],
['Поиск штата…','Пошук штату…','Search states…'],
['Фильтр результатов','Фільтр результатів','Results filter'],
['Все штаты','Усі штати','All states'],
['С подсчётом','З підрахунком','Reporting'],
['Разрыв менее 5 п.п.','Різниця менш як 5 в. п.','Gap below 5 pp'],
['Без результатов','Без результатів','No results'],
['Важное уточнение:','Важливе уточнення:','Important:'],
['на 3 ноября 2026 года подсчёт начинается после закрытия участков. Отсутствие цифр означает отсутствие опубликованных данных, а не 0% поддержки партии. Досрочное голосование и партийная регистрация не считаются голосами за кандидатов.','станом на 3 листопада 2026 року підрахунок починається після закриття дільниць. Відсутність цифр означає, що дані ще не оприлюднено, а не 0% підтримки партії. Дострокове голосування та партійна реєстрація не є голосами за кандидатів.','on November 3, 2026, counting begins after polls close. Missing figures mean no results have been reported, not 0% support for a party. Early voting and party registration are not votes for candidates.'],
['Обновление при каждом открытии, возвращении на вкладку и далее каждые 60 секунд. Зеркало для GitHub Pages может обновляться с задержкой (обычно от 5 минут, иногда дольше). Данные не сертифицированы до утверждения результатов штатами.','Оновлення під час кожного відкриття, повернення на вкладку та кожні 60 секунд. Копія на GitHub Pages може оновлюватися із затримкою (зазвичай від 5 хвилин, іноді довше). Дані не є сертифікованими до затвердження результатів штатами.','Refreshes on every open, when returning to the tab, and every 60 seconds. The GitHub Pages mirror may lag (usually 5 minutes or more). Figures are not certified until states formally confirm the results.'],
['Данные: ','Дані: ','Data: '],
[', CC BY 4.0; исходные источники — избирательные органы штатов, указанные в записи гонки. Иллюстративная tile-grid карта — не географическая проекция.',', CC BY 4.0; першоджерела — виборчі органи штатів, зазначені для кожного змагання. Схематична карта-сітка не є географічною проєкцією.',', CC BY 4.0; original sources are state election authorities cited for each race. The tile-grid map is schematic, not a geographic projection.'],
['Проверить первоисточник ↗','Перевірити першоджерело ↗','Verify original source ↗'],
['Перейти к штатам ↑','Перейти до штатів ↑','Go to states ↑'],
['Данные штата','Дані штату','State details'],
['Закрыть','Закрити','Close'],
['Результаты получены.','Результати отримано.','Results loaded.'],
['Ожидается подсчёт.','Очікується підрахунок.','Awaiting count.'],
['Источник ещё не опубликовал результатов. До закрытия участков проценты по партиям не отображаются.','Джерело ще не оприлюднило результати. До закриття дільниць відсотки за партіями не відображаються.','The source has not published results yet. Party percentages are not shown before polls close.'],
['Голоса могут изменяться по мере подсчёта.','Кількість голосів може змінюватися під час підрахунку.','Vote counts may change as counting continues.'],
['Есть опубликованные результаты, но они могут быть не самыми свежими.','Є оприлюднені результати, але вони можуть бути не найновішими.','Reported results are available but may be out of date.'],
['Не удалось загрузить результаты.','Не вдалося завантажити результати.','Could not load results.'],
['Проверьте интернет или откройте опубликованную версию через HTTPS.','Перевірте інтернет або відкрийте опубліковану версію через HTTPS.','Check your connection or open the published site over HTTPS.'],
['Источник временно недоступен.','Джерело тимчасово недоступне.','Source temporarily unavailable.'],
['Показана последняя успешно загруженная копия','Показано останню успішно завантажену копію','Showing the last successfully loaded snapshot'],
['Данные могут быть устаревшими.','Дані можуть бути застарілими.','Data may be outdated.'],
['Ошибка обновления','Помилка оновлення','Update error'],
['Копия результатов','Копія результатів','Cached results'],
['Данные загружены','Дані завантажено','Data loaded'],
['Ожидание подсчёта','Очікування підрахунку','Awaiting count'],
['Ошибка связи / резервные данные','Помилка з’єднання / резервні дані','Connection error / cached data'],
['Публикация результатов','Оприлюднення результатів','Results reporting'],
['Прямой источник','Пряме джерело','Direct source'],
['Зеркало GitHub Pages','Копія GitHub Pages','GitHub Pages mirror'],
['Сохранённая копия','Збережена копія','Saved snapshot'],
['источник не ответил вовремя','джерело не відповіло вчасно','source timed out'],
['сетевой сбой','помилка мережі','network error'],
['Неверный формат данных','Неправильний формат даних','Invalid data format'],
['не опубликовано','не оприлюднено','not published'],
['ещё не опубликовано','ще не оприлюднено','not yet published'],
['штатов уже публикуют подсчёт · нажмите на штат','штатів уже публікують підрахунок · натисніть на штат','states reporting votes · select a state'],
['Голоса за партии ещё не опубликованы. Ниже доступна статистика досрочного голосования.','Голоси за партії ще не оприлюднено. Нижче доступна статистика дострокового голосування.','Party vote totals have not been reported yet. Early-voting figures are shown below.'],
['Общая доля голосов в опубликованных гонках по округам штата','Загальна частка голосів у виборчих округах штату, де є дані','Combined reported vote share across districts in this state'],
['Проценты от опубликованных голосов в соответствующей гонке','Відсотки від оприлюднених голосів у відповідних перегонах','Percentages of reported votes in each race'],
['нет опубликованных результатов','немає оприлюднених результатів','no results reported'],
['нет этой гонки','немає таких виборів','no such race'],
['Нет штатов, соответствующих фильтру.','Немає штатів, що відповідають фільтру.','No states match the filter.'],
['В этом штате нет таких выборов','У цьому штаті немає таких виборів','No such race in this state'],
['Ожидается публикация результатов','Очікується оприлюднення результатів','Awaiting reported results'],
['Подробнее ›','Докладніше ›','Details ›'],
['Голоса ещё не опубликованы','Голоси ще не оприлюднено','Votes not reported yet'],
['В этом штате нет такой гонки','У цьому штаті немає таких перегонів','No such race in this state'],
['Источник пока не опубликовал результаты для этого штата.','Джерело поки не оприлюднило результати для цього штату.','The source has not published results for this state yet.'],
['В 2026 году здесь нет выборов на выбранную должность.','У 2026 році тут немає виборів на вибрану посаду.','No election for the selected office is being held here in 2026.'],
['Специальные выборы','Спеціальні вибори','Special election'],
['Подсчёт не опубликован','Підрахунок не оприлюднено','No count reported'],
['Список кандидатов или голоса ещё не опубликованы.','Список кандидатів або голоси ще не оприлюднено.','Candidate list or vote totals not yet reported.'],
['Источник обновлён:','Джерело оновлено:','Source updated:'],
['Статус:','Статус:','Status:'],
['Объявлено:','Оголошено:','Called by:'],
['Кандидат','Кандидат','Candidate'],
['Округ','Округ','District'],
['голосов','голосів','votes'],
['голоса','голоси','votes'],
['голос','голос','vote'],
['учтённых голосов','врахованих голосів','votes counted'],
['опубликованных голосов','оприлюднених голосів','reported votes'],
['гонок с подсчётом','перегонів з підрахунком','races reporting'],
['гонок','перегонів','races'],
['обработано','опрацьовано','processed'],
['с подсчётом','із підрахунком','reporting'],
['отчётность из','звітність із','reporting from'],
['штатов и территорий','штатів і територій','states and territories'],
['Даты отчётности различаются; это не результат выборов.','Дати звітності різняться; це не результат виборів.','Reporting dates vary; these are not election results.'],
['Опубликовано','Оприлюднено','Reported'],
['бюллетеней','бюлетенів','ballots'],
['Не удалось загрузить статистику:','Не вдалося завантажити статистику:','Could not load statistics:'],
['Попробуйте обновить страницу.','Спробуйте оновити сторінку.','Try refreshing the page.'],
['Данные досрочного голосования ещё не получены.','Дані дострокового голосування ще не отримано.','Early-voting data have not been received yet.'],
['Данные на','Дані станом на','Data as of'],
['Источник недоступен','Джерело недоступне','Source unavailable'],
['Ожидаем данные','Очікуємо дані','Awaiting data'],
['Досрочное голосование','Дострокове голосування','Early voting'],
['Прямой источник','Пряме джерело','Direct source'],
['Резервная копия бюллетеней','Резервна копія бюлетенів','Backup ballot data'],
['Live API','Live API','Live API'],
['Live копия','Live копія','Live mirror'],
['Нет данных досрочного голосования','Немає даних дострокового голосування','No early-vote data'],
['Превышено время ожидания','Перевищено час очікування','Request timed out'],
['Неполный формат','Неповний формат','Incomplete format'],
['Ожидание рыночных котировок','Очікування ринкових котирувань','Awaiting market odds'],
['Источник ↗','Джерело ↗','Source ↗'],
['Рынок ↗','Ринок ↗','Market ↗'],
['Котировок пока нет','Котирувань поки немає','Odds not available'],
['рынков ·','ринків ·','markets ·'],
['Прямой API ·','Прямий API ·','Direct API ·'],
['Резервная копия ·','Резервна копія ·','Cached snapshot ·'],
['цены на','ціни станом на','prices as of'],
['нет отметки времени','немає позначки часу','timestamp not available'],
['время не указано','час не вказано','time not provided'],
['Обе палаты','Обидві палати','Both chambers'],
['Обе — демократы','Обидві — демократи','Both — Democrats'],
['Обе — республиканцы','Обидві — республіканці','Both — Republicans'],
['Сенат R, Палата D','Сенат R, Палата D','Senate R, House D'],
['Сенат D, Палата R','Сенат D, Палата R','Senate D, House R'],
['губернатор','губернатор','governor'],
['Обновить','Оновити','Refresh'],
['штатов','штатів','states'],
['штате','штаті','state'],
['штата','штату','state'],
['открыт','відкрито','open'],
[' млн',' млн','m'],
[' тыс.',' тис.','k'],
];
const STATE=[
['Алабама','Алабама','Alabama'],['Аляска','Аляска','Alaska'],['Аризона','Аризона','Arizona'],['Арканзас','Арканзас','Arkansas'],
['Калифорния','Каліфорнія','California'],['Колорадо','Колорадо','Colorado'],['Коннектикут','Коннектикут','Connecticut'],['Делавэр','Делавер','Delaware'],
['Флорида','Флорида','Florida'],['Джорджия','Джорджія','Georgia'],['Гавайи','Гаваї','Hawaii'],['Айдахо','Айдахо','Idaho'],
['Иллинойс','Іллінойс','Illinois'],['Индиана','Індіана','Indiana'],['Айова','Айова','Iowa'],['Канзас','Канзас','Kansas'],
['Кентукки','Кентуккі','Kentucky'],['Луизиана','Луїзіана','Louisiana'],['Мэн','Мен','Maine'],['Мэриленд','Меріленд','Maryland'],
['Массачусетс','Массачусетс','Massachusetts'],['Мичиган','Мічиган','Michigan'],['Миннесота','Міннесота','Minnesota'],['Миссисипи','Міссісіпі','Mississippi'],
['Миссури','Міссурі','Missouri'],['Монтана','Монтана','Montana'],['Небраска','Небраска','Nebraska'],['Невада','Невада','Nevada'],
['Нью-Гэмпшир','Нью-Гемпшир','New Hampshire'],['Нью-Джерси','Нью-Джерсі','New Jersey'],['Нью-Мексико','Нью-Мексико','New Mexico'],['Нью-Йорк','Нью-Йорк','New York'],
['Северная Каролина','Північна Кароліна','North Carolina'],['Северная Дакота','Північна Дакота','North Dakota'],['Огайо','Огайо','Ohio'],['Оклахома','Оклахома','Oklahoma'],
['Орегон','Орегон','Oregon'],['Пенсильвания','Пенсильванія','Pennsylvania'],['Род-Айленд','Род-Айленд','Rhode Island'],['Южная Каролина','Південна Кароліна','South Carolina'],
['Южная Дакота','Південна Дакота','South Dakota'],['Теннесси','Теннессі','Tennessee'],['Техас','Техас','Texas'],['Юта','Юта','Utah'],
['Вермонт','Вермонт','Vermont'],['Вирджиния','Вірджинія','Virginia'],['Вашингтон','Вашингтон','Washington'],['Западная Вирджиния','Західна Вірджинія','West Virginia'],
['Висконсин','Вісконсин','Wisconsin'],['Вайоминг','Вайомінг','Wyoming']
];
const dict=new Map([...P,...STATE].map(([ru,uk,en])=>[ru,{uk,en}]));
const ordered=[...dict.keys()].sort((a,b)=>b.length-a.length);
const TRACK_TEXT=new WeakMap(),TRACK_ATTR=new WeakMap();
const attributes=['title','aria-label','placeholder','aria-description'];
const forbidden=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','OPTION']);
function detect(){
 const prefs=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en'];
 for(const pref of prefs){const base=String(pref).toLowerCase().split('-')[0];if(['uk','ru','en'].includes(base))return base;}
 return 'en';
}
let chosen='auto';
try{const saved=localStorage.getItem('usmidterms2026:locale');if(['auto','uk','ru','en'].includes(saved))chosen=saved;}catch{}
let lang=chosen==='auto'?detect():chosen;
function translate(text,target){
 if(target==='ru'||!text||!/[А-Яа-яЁё]/.test(text))return text;
 const trimmed=text.trim();
 if(dict.has(trimmed)){
   const val=dict.get(trimmed)[target];
   if(val!==undefined)return text.replace(trimmed,val);
 }
 let out=text;
 for(const ru of ordered){
  // Match complete Russian words only; do not translate inside another word.
  if(ru.length<=2||!out.includes(ru))continue;
  const tr=dict.get(ru)[target];
  if(tr===undefined||tr===ru)continue;
  const isStart=/^[А-Яа-яЁё]/.test(ru),isEnd=/[А-Яа-яЁё]$/.test(ru);
  const special='\\.^$*+?()[]{}|';
  const escaped=Array.from(ru).map(c=>special.includes(c)?'\\'+c:c).join('');
  const re=new RegExp((isStart?'(^|[^А-Яа-яЁё])':'')+escaped+(isEnd?'(?=$|[^А-Яа-яЁё])':''),'gu');
  out=out.replace(re,(match,leading)=>isStart?leading+tr:tr);
 }
 return out;
}
function textNode(n){
 const cur=n.nodeValue||'';
 let item=TRACK_TEXT.get(n);
 if(!item||item.rendered!==cur){item={base:cur,rendered:cur};TRACK_TEXT.set(n,item)}
 const next=translate(item.base,lang);
 item.rendered=next;
 if(cur!==next)n.nodeValue=next;
}
function elementAttrs(el){
 let store=TRACK_ATTR.get(el);if(!store){store={};TRACK_ATTR.set(el,store)}
 for(const attr of attributes){
  if(!el.hasAttribute(attr))continue;
  const now=el.getAttribute(attr);
  let rec=store[attr];
  if(!rec||rec.rendered!==now){rec={base:now,rendered:now};store[attr]=rec}
  const next=translate(rec.base,lang);rec.rendered=next;
  if(now!==next)el.setAttribute(attr,next);
 }
}
function walk(node){
 if(node.nodeType===3){if(!node.parentElement||!forbidden.has(node.parentElement.tagName))textNode(node);return}
 if(node.nodeType!==1)return;
 if(forbidden.has(node.tagName)||node.closest('[data-i18n-skip]'))return;
 elementAttrs(node);
 for(let n=node.firstChild;n;n=n.nextSibling)walk(n);
}
function updateMetadata(){
 document.documentElement.lang=lang;
 const title={ru:'Выборы США 2026 — Live · Polymarket',uk:'Вибори США 2026 — Live · Polymarket',en:'US Elections 2026 — Live · Polymarket'};
 document.title=title[lang];
 const description=document.querySelector('meta[name="description"]');
 if(description)description.content={ru:'Интерактивные результаты выборов США 2026, раннее голосование и котировки Polymarket.',uk:'Інтерактивні результати виборів у США 2026, дострокове голосування та котирування Polymarket.',en:'Interactive 2026 US election results, early voting and Polymarket odds.'}[lang];
 const select=document.getElementById('languageSelect');
 if(select)select.value=chosen;
}
let observer;
function apply(trigger){
 updateMetadata();
 walk(document.body);
 if(trigger)window.dispatchEvent(new CustomEvent('dashboard:languagechange',{detail:{language:lang,selection:chosen}}));
}
const select=document.getElementById('languageSelect');
if(select){
 select.value=chosen;
 select.addEventListener('change',()=>{
  chosen=select.value;
  lang=chosen==='auto'?detect():chosen;
  try{if(chosen==='auto')localStorage.removeItem('usmidterms2026:locale');else localStorage.setItem('usmidterms2026:locale',chosen)}catch{}
  apply(true);
 });
}
window.addEventListener('languagechange',()=>{if(chosen==='auto'){lang=detect();apply(true)}});
window.dashboardLocale=()=>lang;
window.dashboardTranslate=(s)=>translate(String(s??''),lang);
apply(false);
observer=new MutationObserver(records=>{
 for(const r of records){
  if(r.type==='characterData'){walk(r.target)}
  else if(r.type==='attributes'){elementAttrs(r.target)}
  else for(const node of r.addedNodes)walk(node);
 }
});
observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attributes});
})();

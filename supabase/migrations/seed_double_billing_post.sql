-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- Seeds the "Double-Billing Mystery" postmortem post in English and Korean.
-- Assumes `posts` has columns: slug, title, content, excerpt, tags (text[]),
-- published (bool), category_id (uuid, nullable), created_at, updated_at.
-- If `tags` is jsonb instead of text[], change the array[...] literals below
-- to '["a","b"]'::jsonb.

insert into posts (slug, title, content, excerpt, tags, published, category_id, created_at, updated_at)
values (
  'the-double-billing-mystery',
  'The Double-Billing Mystery: How One Nonexistent Field Kept Charging Customers Twice',
  $body_en$<p>The payment succeeded. The system insisted it hadn't. And in the gap between those two facts, Canada Post kept getting billed for the same shipping label, over and over.</p>

<h2>The symptom: a successful payment that never stopped "failing"</h2>
<p>While digging through the shipping label logic on fifa2026.ca's checkout, I noticed a pattern that didn't add up. Every request to Shippo's API to purchase a label came back fine. The charge went through. But our own logs recorded "label creation failed" every single time.</p>
<p>A "failed" label triggers a retry. A retry means purchasing a new label. From Shippo's and Canada Post's point of view, each of those was a perfectly valid, independently successful transaction. The result: one order, several labels purchased, several charges — all for a single package.</p>

<h2>First pass: the response was fine, the verdict wasn't</h2>
<p>The obvious suspects were a network timeout or a flaky response from Shippo — the usual culprits when a shipping integration misbehaves. But laying the logs side by side told a different story.</p>
<ul>
<li>Shippo's dashboard: label issued, payment captured, no errors</li>
<li>Our system: the exact same request logged as a failure</li>
<li>Immediately after: a fresh label purchase request for the same order</li>
</ul>
<p>The API was answering correctly. Our own verdict logic was the one that was always wrong. Bugs like this don't leave a stack trace or an exception — the code was, from its own perspective, taking the failure branch "correctly." Classic debugging with no silver bullet: nothing was throwing, so nothing pointed at itself.</p>

<h2>The culprit: one field that never existed</h2>
<p>The code that decided whether a label purchase succeeded looked roughly like this:</p>
<pre><code>if (response.object_status === "SUCCESS") {
  // handle success
}</code></pre>
<p>The problem: <code>object_status</code> isn't a field Shippo's response schema has ever had. The actual field is <code>status</code>. That condition was unsatisfiable from the day it was written — no matter how cleanly a label purchase succeeded, this check always fell through to the failure branch.</p>
<p>The worse part: this wasn't a single typo in a single place. The same wrong field name had been copied across five different routes that touched label state — creation, failure recovery, status sync, and resend, among others. Someone made the mistake once, and it propagated by copy-paste.</p>

<h2>The fix: all five routes, and then verification</h2>
<p>Correcting a field name is a one-line change. But once I understood this bug had actually caused real customers to be double-charged, "fix the typo and ship it" wasn't good enough.</p>
<ul>
<li>Found every route with the same pattern and corrected all five consistently</li>
<li>Re-verified the corrected logic against Shippo's real API — not a staging mock, the actual response shape</li>
<li>Traced and cleaned up the orders that had already been double-charged</li>
<li>Monitored label success rate and retry frequency after deploy to confirm the loop had actually stopped</li>
</ul>
<p>For an integration where real money moves, "the condition is true now" isn't sufficient proof. You have to re-run the whole path against what the live API actually sends back, start to finish.</p>

<h2>Looking back</h2>
<p>What makes this bug worth writing about isn't its complexity — it's the lack of it. A field name, wrong since the moment it was typed, quietly replicated across the codebase, and quietly showing up as real charges on real customers' cards. No exception. No stack trace. Just a mismatch between what the logs said and what actually happened.</p>
<p>The only way to catch a bug like this is to put the logs and the dashboard side by side and chase the gap between "what the code decided" and "what actually happened" — not "what the code says is wrong." There's no silver bullet for this kind of debugging. There's only tracing it down.</p>$body_en$,
  'The payment succeeded. The system insisted it hadn''t. And in the gap between those two facts, Canada Post kept getting billed for the same shipping label, over and over. The sympto',
  array['debugging', 'root-cause-analysis', 'ecommerce', 'shippo', 'postmortem'],
  true,
  null,
  now(),
  now()
)
on conflict (slug) do nothing;

insert into posts (slug, title, content, excerpt, tags, published, category_id, created_at, updated_at)
values (
  'the-double-billing-mystery-kr',
  '이중 청구의 미스터리: 존재하지 않는 필드 하나가 만든 배송비 버그',
  $body_kr$<p>결제 화면에는 "성공"이 찍혔다. 그런데 시스템은 계속 "실패"라고 우겼다. 그리고 그 사이, Canada Post에는 같은 배송라벨이 여러 번 청구되고 있었다.</p>

<h2>증상: 성공한 결제가 계속 "실패"로 보인다</h2>
<p>fifa2026.ca 체크아웃에서 배송라벨을 발급하는 로직을 살펴보다가 이상한 패턴을 하나 발견했다. Shippo API에 라벨 구매 요청을 보내면 응답은 정상적으로 돌아온다. 결제도 실제로 일어난다. 그런데 우리 시스템의 로그에는 매번 "라벨 생성 실패"가 찍혀 있었다.</p>
<p>실패로 기록되니 다음 로직이 뒤따라 실행된다 — 재시도. 그리고 재시도는 새로운 라벨 구매를 의미했다. Shippo와 Canada Post 입장에서는 각각이 전부 "정상적으로 성공한 별개의 거래"였다. 결과적으로 하나의 주문에 라벨이 여러 번 구매되고, 그만큼 청구도 여러 번 발생하고 있었다.</p>

<h2>1차 조사: 응답은 있는데, 판정은 틀렸다</h2>
<p>가장 먼저 의심한 건 네트워크 타임아웃이나 Shippo 쪽의 일시적 오류였다. 흔히 배송 API 연동에서 겪는 전형적인 원인이니까. 하지만 로그를 나란히 놓고 보니 그림이 달랐다.</p>
<ul>
<li>Shippo 대시보드: 라벨 정상 발급, 결제 정상 승인</li>
<li>우리 시스템: 동일한 요청을 "실패"로 기록</li>
<li>그 직후: 동일 주문에 대해 새 라벨 구매 요청 발생</li>
</ul>
<p>API 응답은 정상인데 우리 쪽 판정 로직이 항상 틀린 답을 내고 있다는 뜻이었다. 이런 종류의 버그는 스택 트레이스도, 에러 로그도 남기지 않는다. 코드 입장에서는 "정상적으로" 실패 분기를 탄 것이기 때문이다. 전형적인, 실버 불릿 없는 디버깅이었다.</p>

<h2>범인: 존재하지 않는 필드 하나</h2>
<p>라벨 구매 성공 여부를 판정하는 코드를 열어보니, 다음과 같은 형태의 체크가 있었다.</p>
<pre><code>if (response.object_status === "SUCCESS") {
  // 성공 처리
}</code></pre>
<p>문제는 <code>object_status</code>라는 필드가 Shippo 응답 스키마 어디에도 없다는 것이었다. 실제 필드명은 <code>status</code>였다. 즉 이 조건문은 태어난 순간부터 단 한 번도 참이 될 수 없었다. 라벨 구매가 아무리 완벽하게 성공해도, 이 코드는 항상 실패 분기로 빠졌다.</p>
<p>더 나쁜 소식은 이 잘못된 필드명이 한 곳이 아니었다는 것이다. 라벨 생성, 실패 복구, 상태 동기화, 재발송 등 라벨 상태를 다루는 다섯 개 라우트에 걸쳐 같은 실수가 복제돼 있었다. 누군가 한 번 틀린 코드를 작성했고, 그게 그대로 복사·붙여넣기 되며 퍼진 것이다.</p>

<h2>고치기: 다섯 곳 전부, 그리고 검증</h2>
<p>필드명 하나를 고치는 건 1분이면 끝나는 일이다. 하지만 이 버그가 실제로 고객에게 이중 청구를 유발하고 있었다는 걸 아는 이상, "필드명만 고치고 배포"는 할 수 없었다.</p>
<ul>
<li>같은 패턴이 남아있는 라우트를 전부 찾아 다섯 곳을 동일하게 수정</li>
<li>수정한 판정 로직을 실제 Shippo API에 대고 다시 검증 — 스테이징이 아니라 진짜 응답 스키마로</li>
<li>이미 중복 청구된 과거 주문 건을 별도로 추적해 정리</li>
<li>배포 후 라벨 성공률과 재시도 발생률을 다시 모니터링</li>
</ul>
<p>배송 API처럼 실제 돈이 오가는 연동에서는, "이제 조건문이 참이 되는 걸 확인했다"만으로는 부족하다. 실제 API가 진짜로 보내주는 응답 형태로, 처음부터 끝까지 다시 재현해봐야 한다.</p>

<h2>돌아보며</h2>
<p>이 버그가 흥미로운 이유는 복잡한 로직 때문이 아니라, 오히려 그 반대이기 때문이다. 오탈자 수준의 필드명 하나가 조용히 복제되며 실제 매출과 실제 고객 청구에 영향을 미치고 있었다. 스택 트레이스도, 예외도 없었다. 있는 건 오직 "패턴이 안 맞는다"는 감각뿐이었다.</p>
<p>이런 버그를 잡는 방법은 하나다 — 로그와 대시보드를 나란히 놓고, "코드가 틀렸다는 증거"가 아니라 "코드의 판정과 실제 결과가 어긋난다는 증거"를 쫓는 것. 실버 불릿은 없다. 있는 건 추적뿐이다.</p>$body_kr$,
  '결제 화면에는 "성공"이 찍혔다. 그런데 시스템은 계속 "실패"라고 우겼다. 그리고 그 사이, Canada Post에는 같은 배송라벨이 여러 번 청구되고 있었다. 증상: 성공한 결제가 계속 "실패"로 보인다 fifa2026.ca 체크아웃에서 배송라벨을 발급하는 로직을 살펴보다가 이상한 패턴을 하나 발견했다. Shippo',
  array['디버깅', '근본원인분석', '이커머스', 'shippo', '포스트모템'],
  true,
  null,
  now(),
  now()
)
on conflict (slug) do nothing;

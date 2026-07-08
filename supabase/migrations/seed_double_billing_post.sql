-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query)
-- Seeds the "Double-Billing Mystery" post: English section first, a bare <hr>,
-- then the Korean section -- matching this blog's existing bilingual-in-one-post
-- format (see e.g. "Building Systems in my life [ep 1]" / "E-commerce [ep. 1]").
-- Category: Develop (e8e98107-3a94-4171-9d93-ed39df78a4be).
-- This is an upsert -- safe to re-run.

insert into posts (slug, title, content, excerpt, tags, published, category_id, created_at, updated_at)
values (
  'the-double-billing-mystery',
  'The Double-Billing Mystery',
  $body$<p>Something didn't add up. The payment had gone through. Shippo had issued the label. And our own system kept logging it as a failure anyway.</p>
<p>This was on fifa2026.ca, the checkout flow that generates a shipping label through Shippo right after a customer pays. Every time a label "failed," the code retried. A retry meant purchasing a brand new label. From Shippo's side, and from Canada Post's side, each retry was a completely legitimate, completely separate transaction.</p>
<p>Which meant customers were quietly being charged more than once for the same package.</p>
<p>My first instinct was the obvious one — a network timeout, a flaky response, something transient on Shippo's end. That's usually where shipping integrations break. But the logs didn't agree with that theory.</p>
<p>Shippo's dashboard showed the label issued and the payment captured, clean, no errors. Our system showed the exact same request marked as failed. And right after that, a brand new label purchase request for the same order.</p>
<p>The API was answering correctly. Our own logic was the one getting it wrong, every single time. That's a hard bug to catch, because nothing throws. Nothing shows up in an error log. The code is, from its own point of view, behaving exactly as written — it's just that what it was written to check for was never real.</p>
<p>I opened the code that decided whether a label purchase had succeeded. It looked something like this:</p>
<pre><code>if (response.object_status === "SUCCESS") {
  // handle success
}</code></pre>
<p><code>object_status</code> isn't a field Shippo's response has ever returned. The real field is <code>status</code>. This condition had been false since the day it was written. No matter how cleanly a label purchase actually succeeded, this code always fell into the failure branch.</p>
<p>And it wasn't only here. The same wrong field name had been copy-pasted into five different routes — label creation, failure recovery, status sync, resend, and one more. One mistake, made once, quietly duplicated everywhere label state was touched.</p>
<p>Fixing the field name itself took about a minute. But knowing this bug had actually double-charged real customers, I couldn't just patch it and move on.</p>
<p>I found and corrected all five routes. Then I re-ran the corrected logic against Shippo's real API — not a mocked response, the actual shape it sends back — before trusting any of it. I went back through the affected orders and cleaned up the duplicate charges. And after deploying, I kept watching label success rate and retry frequency to make sure the loop had actually stopped, not just moved somewhere else.</p>
<p>What stuck with me about this one wasn't the complexity — there wasn't any. A single wrong field name, sitting quietly in five places, had been generating real charges on real customers' cards for who knows how long. No exception. No stack trace. Just a gap between what the logs said and what had actually happened.</p>
<p>The only way to catch that kind of bug is to stop trusting your own error logs and start comparing them against the system you're actually talking to.</p>
<hr>
<p>뭔가 앞뒤가 안 맞았다. 결제는 이미 끝났다. Shippo는 라벨을 발급했다. 그런데 우리 시스템은 계속 그걸 "실패"로 기록하고 있었다.</p>
<p>fifa2026.ca 체크아웃 얘기다. 고객이 결제를 끝내면 바로 Shippo를 통해 배송라벨을 발급하는 구조였다. 라벨이 "실패"로 기록될 때마다 코드는 재시도를 했다. 재시도는 곧 새로운 라벨을 다시 구매한다는 뜻이었다. Shippo 입장에서도, Canada Post 입장에서도 재시도 한 번 한 번은 전부 멀쩡하게 성공한 별개의 거래였다.</p>
<p>즉, 고객은 같은 소포 하나에 대해 조용히 여러 번 청구되고 있었다.</p>
<p>가장 먼저 의심한 건 흔한 원인이었다 — 네트워크 타임아웃, Shippo 쪽의 일시적인 오류. 배송 API 연동이 망가질 때 보통 그렇다. 그런데 로그를 보니 그 가설은 맞지 않았다.</p>
<p>Shippo 대시보드에는 라벨이 정상 발급되고 결제도 정상 승인된 걸로 나와 있었다. 우리 시스템에는 똑같은 요청이 실패로 찍혀 있었다. 그리고 그 직후, 같은 주문에 대해 새 라벨 구매 요청이 또 나갔다.</p>
<p>API는 계속 맞는 답을 주고 있었다. 항상 틀리고 있던 건 우리 쪽 판정 로직이었다. 이런 버그는 잡기 어렵다. 아무것도 던져지지 않으니까. 에러 로그에 아무것도 안 남으니까. 코드 입장에서는 "정상적으로" 자기가 쓰인 대로 실패 분기를 탄 것뿐이다. 문제는 애초에 그 조건이 현실과 맞은 적이 한 번도 없었다는 것.</p>
<p>라벨 구매 성공 여부를 판정하는 코드를 열어봤다. 대략 이런 모양이었다.</p>
<pre><code>if (response.object_status === "SUCCESS") {
  // 성공 처리
}</code></pre>
<p><code>object_status</code>라는 필드는 Shippo 응답에 존재한 적이 없다. 실제 필드명은 <code>status</code>였다. 이 조건문은 작성된 순간부터 단 한 번도 참이 될 수 없었다. 라벨 구매가 아무리 완벽하게 성공해도 이 코드는 항상 실패 분기로 빠졌다.</p>
<p>그리고 이게 한 곳만의 문제가 아니었다. 같은 잘못된 필드명이 라벨 생성, 실패 복구, 상태 동기화, 재발송 등 다섯 개 라우트에 그대로 복사돼 있었다. 한 번의 실수가, 라벨 상태를 다루는 곳마다 조용히 퍼져 있었다.</p>
<p>필드명 하나 고치는 건 1분이면 끝난다. 하지만 이 버그가 실제로 고객에게 이중 청구를 일으키고 있었다는 걸 안 이상, 그냥 고치고 넘어갈 수는 없었다.</p>
<p>다섯 개 라우트를 전부 찾아 고쳤다. 그리고 그 판정 로직을 실제 Shippo API에 대고 다시 검증했다 — 목업이 아니라, 진짜로 돌아오는 응답 형태 그대로. 이미 중복 청구된 주문들을 다시 추적해서 정리했다. 배포 후에는 라벨 성공률과 재시도 빈도를 계속 지켜보면서, 문제가 진짜로 사라졌는지, 다른 곳으로 옮겨간 게 아닌지 확인했다.</p>
<p>이 버그에서 기억에 남는 건 복잡함이 아니라 그 반대였다. 필드명 하나가 다섯 곳에 조용히 숨어서, 실제 고객 카드에 실제 청구를 만들어내고 있었다. 예외도, 스택 트레이스도 없었다. 있는 건 로그가 말하는 것과 실제로 일어난 일 사이의 간극뿐이었다.</p>
<p>이런 버그를 잡는 방법은 하나다. 내 시스템의 에러 로그를 그대로 믿지 않고, 실제로 대화하고 있는 상대 시스템과 나란히 놓고 비교하는 것.</p>$body$,
  'Something didn''t add up. The payment had gone through. Shippo had issued the label. And our own system kept logging it as a failure anyway. This was on fifa2026.ca, the checkout fl',
  array[]::text[],
  true,
  'e8e98107-3a94-4171-9d93-ed39df78a4be',
  now(),
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  content = excluded.content,
  excerpt = excluded.excerpt,
  tags = excluded.tags,
  published = excluded.published,
  category_id = excluded.category_id,
  updated_at = now();

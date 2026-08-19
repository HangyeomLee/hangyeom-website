-- Paste into the Supabase SQL editor.
-- The REST API can't set slug or created_at, which is why this is SQL.

insert into posts (slug, title, content, excerpt, tags, published, category_id, created_at)
values (
  'the-checkout-button-that-charged-twice',
  'The Checkout Button That Charged Twice',
  '<p>Two charges. Same customer, same order, seconds apart. Stripe showed both as successful.</p>
<p>I found it in the payments dashboard before anyone reported it. No email, no phone call. The customer almost certainly hadn''t looked at their statement yet.</p>
<p>This was on the direct-to-consumer storefront we were running alongside the wholesale site. Two days earlier I had moved its checkout off a static form and onto a real backend: create the order, create a Stripe Checkout session, redirect. It worked. I had tested it — the way you test something you wrote yourself, which is to say I clicked each button exactly once, in the right order, like someone who already knows what happens next.</p>
<p>Real customers don''t do that.</p>
<h2>Two bugs that needed each other</h2>
<p>The first one is plain enough to just say: the checkout button had no disabled state. You clicked it, an async request went out, and the button sat there looking exactly as clickable as it had a second earlier. When nothing visibly happens for a beat — and on mobile data nothing visibly happens for several beats — you click again. Each click created a session.</p>
<p>That alone would have been bad. The second bug is what made it worse. Session creation was being kicked off inside a <code>useEffect</code> whose dependency was rebuilt on every render, so the effect didn''t run once on mount and stop. It ran again whenever the component re-rendered.</p>
<p>So there were two independent ways to produce a duplicate charge, and they stacked: an impatient click on a page that was already firing extra requests on its own.</p>
<h2>What I did first</h2>
<p>I turned checkout off. Not a fix — a tourniquet. A flag replaced the button with a short note that payments were briefly unavailable. On a storefront doing modest volume, losing a day of orders was not a close call against continuing to double-charge people.</p>
<p>Then I went through Stripe for the window between the deploy and the shutoff, looked for payments from the same customer for the same amount within a few minutes of each other, and refunded the duplicates. The whole thing took about two days from noticing to shipping the fix.</p>
<h2>The fix, in increasing order of how much I trust it</h2>
<p><strong>Disable the button while the request is in flight.</strong> The obvious one, and the weakest, because it only protects against a user in a browser I control.</p>
<pre><code>const [submitting, setSubmitting] = useState(false);
// ...
&lt;button disabled={submitting} onClick={handleCheckout}&gt;</code></pre>
<p><strong>Stop the effect from re-firing.</strong> The dependency was an object being rebuilt each render. Memoizing it stopped the re-entry, but the better answer was that session creation had no business living in an effect. It''s a response to a click, not to a render. I moved it into the handler.</p>
<p><strong>Put an idempotency key on the Stripe call</strong>, derived from the order rather than generated per request. This is the one that actually holds. The first two fixes assume the client behaves itself. This one assumes it doesn''t. If the same order tries to create a session twice, Stripe hands back the first one instead of making a second.</p>
<pre><code>stripe.checkout.sessions.create(params, {
  idempotencyKey: `checkout_${orderId}`,
});</code></pre>
<h2>What I keep from it</h2>
<p>I used to think of a double-click guard as a UI nicety. It isn''t. It''s the client-side half of a problem whose server-side half is the only half that matters, and I had shipped neither.</p>
<p>The other thing is less comfortable. I caught this because I have a habit of opening Stripe in the morning, and a habit is not monitoring. An alert on two successful payments from the same customer inside five minutes would have caught it in an hour instead of two days, and it isn''t hard to build. Relying on my own routine to notice money moving incorrectly was the actual bug.</p>',
  'Two charges. Same customer, same order, seconds apart. Stripe showed both as successful. I found it in the payments dashboard before anyone reported it. No email, no phone call. Th',
  '{}',
  true,
  'e8e98107-3a94-4171-9d93-ed39df78a4be',
  '2026-06-13T10:00:00+00:00'
);

insert into posts (slug, title, content, excerpt, tags, published, category_id, created_at)
values (
  'the-checkout-button-that-charged-twice-ko',
  '두 번 청구된 결제 버튼',
  '<p>같은 고객, 같은 주문, 몇 초 간격. 결제 두 건이 모두 성공으로 찍혀 있었다.</p>
<p>고객이 알려준 게 아니라 Stripe 대시보드를 보다가 먼저 발견했다. 메일도 전화도 없었다. 그 고객은 아직 카드 명세서를 안 봤을 것이다.</p>
<p>도매 사이트와 별도로 잠깐 운영하던 B2C 스토어에서 일어난 일이다. 이틀 전에 체크아웃을 정적 폼에서 실제 백엔드로 옮겼다. 주문을 만들고, Stripe Checkout 세션을 만들고, 리다이렉트. 잘 됐다. 테스트도 했다. 다만 자기가 짠 코드를 테스트하는 방식으로 했다. 버튼을 정확히 한 번씩, 올바른 순서로, 다음에 무슨 일이 일어날지 이미 아는 사람처럼 눌렀다.</p>
<p>실제 고객은 그렇게 하지 않는다.</p>
<h2>서로를 필요로 한 버그 두 개</h2>
<p>첫 번째는 그냥 말하는 게 낫겠다. 체크아웃 버튼에 비활성화 처리가 없었다. 누르면 비동기 요청이 나가는데, 버튼은 1초 전과 똑같이 눌러도 되는 모습으로 그 자리에 있었다. 잠깐 아무 반응이 없으면 — 모바일 데이터에서는 그 잠깐이 꽤 길다 — 다시 누르게 된다. 누를 때마다 세션이 하나씩 생겼다.</p>
<p>이것만으로도 충분히 나빴다. 두 번째가 상황을 키웠다. 세션 생성이 <code>useEffect</code> 안에서 시작되고 있었는데, 그 의존성이 렌더마다 새로 만들어지는 값이었다. 그래서 마운트될 때 한 번 돌고 끝나는 게 아니라, 컴포넌트가 다시 렌더될 때마다 또 돌았다.</p>
<p>중복 청구로 가는 경로가 서로 독립적으로 두 개 있었고, 둘이 겹쳤다. 이미 혼자서 요청을 더 쏘고 있는 페이지 위에서 고객이 조급하게 한 번 더 누른 것이다.</p>
<h2>먼저 한 일</h2>
<p>체크아웃을 껐다. 고친 게 아니라 지혈이다. 플래그를 걸어서 버튼 자리에 결제가 일시적으로 중단됐다는 안내를 띄웠다. 거래량이 크지 않은 스토어에서 하루치 주문을 잃는 것과 사람들에게 이중 청구를 계속하는 것 사이에서, 고민할 일은 아니었다.</p>
<p>그다음 배포 시점부터 차단 시점까지의 구간을 Stripe에서 훑었다. 같은 고객이 같은 금액을 몇 분 안에 두 번 결제한 건을 찾아서 중복분을 환불했다. 발견부터 수정 배포까지 이틀쯤 걸렸다.</p>
<h2>수정, 내가 신뢰하는 순서대로</h2>
<p><strong>요청이 진행 중일 때 버튼을 잠근다.</strong> 가장 뻔하고 가장 약한 방어다. 내가 통제하는 브라우저 안의 사용자만 막아주기 때문이다.</p>
<pre><code>const [submitting, setSubmitting] = useState(false);
// ...
&lt;button disabled={submitting} onClick={handleCheckout}&gt;</code></pre>
<p><strong>이펙트가 다시 안 돌게 막는다.</strong> 의존성이 렌더마다 새로 만들어지던 객체였다. 메모이제이션으로 재진입은 막혔지만, 더 나은 답은 애초에 세션 생성이 이펙트에 있을 이유가 없었다는 것이다. 그건 렌더에 대한 반응이 아니라 클릭에 대한 반응이다. 핸들러 안으로 옮겼다.</p>
<p><strong>Stripe 호출에 멱등성 키를 붙인다.</strong> 요청마다 생성하는 게 아니라 주문에서 유도한 키다. 실제로 버텨주는 건 이거다. 앞의 두 개는 클라이언트가 얌전히 굴 거라고 가정하고, 이건 안 그럴 거라고 가정한다. 같은 주문이 세션을 두 번 만들려 하면 Stripe가 새로 만드는 대신 첫 번째 것을 돌려준다.</p>
<pre><code>stripe.checkout.sessions.create(params, {
  idempotencyKey: `checkout_${orderId}`,
});</code></pre>
<h2>남은 것</h2>
<p>더블클릭 가드를 UI 편의 기능 정도로 생각했었다. 아니었다. 그건 어떤 문제의 클라이언트 쪽 절반이고, 그 문제에서 실제로 중요한 건 서버 쪽 절반인데, 나는 양쪽 다 없이 배포했다.</p>
<p>덜 편한 이야기가 하나 더 있다. 이걸 발견한 건 아침에 Stripe를 열어보는 습관 때문이었는데, 습관은 모니터링이 아니다. 같은 고객의 결제가 5분 안에 두 건 성공하면 알림이 오게 해두었다면 이틀이 아니라 한 시간 만에 잡혔을 것이고, 그건 만들기 어려운 것도 아니다. 돈이 잘못 움직이는 걸 내 아침 루틴에 기대어 알아차리고 있었다는 것, 그게 진짜 버그였다.</p>',
  '같은 고객, 같은 주문, 몇 초 간격. 결제 두 건이 모두 성공으로 찍혀 있었다. 고객이 알려준 게 아니라 Stripe 대시보드를 보다가 먼저 발견했다. 메일도 전화도 없었다. 그 고객은 아직 카드 명세서를 안 봤을 것이다. 도매 사이트와 별도로 잠깐 운영하던 B2C 스토어에서 일어난 일이다. 이틀 전에 체크아웃을 정적 ',
  '{}',
  true,
  'e8e98107-3a94-4171-9d93-ed39df78a4be',
  '2026-06-13T09:55:00+00:00'
);

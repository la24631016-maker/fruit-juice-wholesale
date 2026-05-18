import React, { useEffect, useMemo, useState } from "react";

const initialJuiceItems = [
  { id: "juice-sugarcane", category: "juice", name: "甘蔗汁", spec: "750ml / 瓶", price: 70, note: "天然清甜，清爽解膩", image: "/juice/sugarcane.jpg", active: true },
  { id: "juice-passion", category: "juice", name: "百香果汁（有籽）", spec: "750ml / 瓶", price: 120, note: "酸甜香氣明顯，適合調飲、甜點店", image: "/juice/passionfruit.jpg", active: true },
  { id: "juice-guava", category: "juice", name: "芭樂汁", spec: "750ml / 瓶", price: 80, note: "口感滑順，果香溫和", image: "/juice/guava.jpg", active: true },
  { id: "juice-kumquat", category: "juice", name: "金桔汁", spec: "750ml / 瓶", price: 90, note: "清新微酸，提神爽口", image: "/juice/kumquat.jpg", active: true },
  { id: "juice-orange", category: "juice", name: "柳丁汁", spec: "750ml / 瓶", price: 80, note: "經典清甜，餐飲常備款", image: "/juice/orange-sea.jpg", active: true },
  { id: "juice-ponkan", category: "juice", name: "椪柑汁", spec: "750ml / 瓶", price: 100, note: "柑橘香氣飽滿，酸甜順口", image: "/juice/ponkan.jpg", active: true },
  { id: "juice-mango", category: "juice", name: "愛文芒果汁", spec: "750ml / 瓶", price: 100, note: "香甜濃厚，熱帶風味明顯", image: "/juice/mango.jpg", active: true },
  { id: "juice-coconut", category: "juice", name: "椰子水", spec: "750ml / 瓶", price: 90, note: "清透甘甜，清爽解渴", image: "/juice/coconut.jpg", active: true },
  { id: "juice-grape", category: "juice", name: "葡萄汁", spec: "750ml / 瓶", price: 110, note: "果香濃郁，口感飽滿", image: "/juice/grape.jpg", active: true },
  { id: "juice-grapefruit", category: "juice", name: "葡萄柚汁（有果肉）", spec: "750ml / 瓶", price: 100, note: "微苦回甘，清爽有層次", image: "/juice/grapefruit.jpg", active: true },
  { id: "juice-pineapple", category: "juice", name: "鳳梨汁", spec: "750ml / 瓶", price: 100, note: "酸甜明亮，熱帶系人氣款", image: "/juice/pineapple.jpg", active: true },
  { id: "juice-ginger", category: "juice", name: "薑母汁", spec: "750ml / 瓶", price: 145, note: "暖口辛香，冬季推薦", image: "/juice/ginger.jpg", active: true },
  { id: "juice-lemon", category: "juice", name: "檸檬汁", spec: "750ml / 瓶", price: 100, note: "酸香俐落，調飲百搭", image: "/juice/lime.jpg", active: true },
];

const initialFruitItems = [
  { id: "fruit-banana", category: "fruit", name: "香蕉", spec: "一箱 / 約13kg", price: 520, note: "甜度穩定，適合餐飲、團購", active: true },
  { id: "fruit-apple", category: "fruit", name: "蘋果", spec: "一箱 / 約18kg", price: 980, note: "脆甜耐放，店家常備款", active: true },
  { id: "fruit-orange", category: "fruit", name: "柳丁", spec: "一箱 / 約20kg", price: 760, note: "榨汁、零售皆適合", active: true },
  { id: "fruit-guava", category: "fruit", name: "芭樂", spec: "一箱 / 約20kg", price: 680, note: "健康天然，高纖爽口", active: true },
  { id: "fruit-watermelon", category: "fruit", name: "西瓜", spec: "一顆 / 依重量計", price: 180, note: "夏季主力，適合切盤、果汁", active: true },
];

const juiceSlides = [
  {
    title: "甘蔗汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/sugarcane.jpg",
  },
  {
    title: "百香果汁（有籽）",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/passionfruit.jpg",
  },
  {
    title: "芭樂汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/guava.jpg",
  },
  {
    title: "金桔汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/kumquat.jpg",
  },
  {
    title: "柳丁汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/orange-sea.jpg",
  },
  {
    title: "椪柑汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/ponkan.jpg",
  },
  {
    title: "愛文芒果汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/mango.jpg",
  },
  {
    title: "椰子水",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/coconut.jpg",
  },
  {
    title: "葡萄汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/grape.jpg",
  },
  {
    title: "葡萄柚汁（有果肉）",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/grapefruit.jpg",
  },
  {
    title: "鳳梨汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/pineapple.jpg",
  },
  {
    title: "薑母汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/ginger.jpg",
  },
  {
    title: "檸檬汁",
    subtitle: "100%純天然｜無加水｜無加糖",
    image: "/juice/lime.jpg",
  },
];

const fruitSlides = [
  {
    title: "香蕉",
    subtitle: "自然熟成｜批發採購｜穩定供貨",
    image: "/fruit/banana.jpg",
    emoji: "🍌",
  },
  {
    title: "蘋果",
    subtitle: "清脆香甜｜店家常備｜耐放好搭",
    image: "/fruit/apple.jpg",
    emoji: "🍎",
  },
  {
    title: "柳丁",
    subtitle: "新鮮多汁｜榨汁零售｜餐飲適用",
    image: "/fruit/orange.jpg",
    emoji: "🍊",
  },
  {
    title: "芭樂",
    subtitle: "清爽高纖｜健康天然｜團購熱門",
    image: "/fruit/guava.jpg",
    emoji: "🍐",
  },
  {
    title: "西瓜",
    subtitle: "夏季主力｜清甜消暑｜切盤果汁皆宜",
    image: "/fruit/watermelon.jpg",
    emoji: "🍉",
  },
];

const sampleOrders = [
  {
    id: "ORD-20260508-001",
    createdAt: "2026-05-08 10:30",
    customerName: "木沐早午餐",
    phone: "0912-345-678",
    address: "台中市西區範例路 88 號",
    payment: "匯款付款",
    status: "待確認",
    items: [
      { name: "柳丁汁", spec: "750ml / 瓶", qty: 6, price: 80 },
      { name: "百香果汁（有籽）", spec: "750ml / 瓶", qty: 4, price: 120 },
    ],
    note: "上午配送，需開收據",
  },
  {
    id: "ORD-20260508-002",
    createdAt: "2026-05-08 11:15",
    customerName: "林小姐",
    phone: "0988-888-888",
    address: "台中市南屯區健康路 18 號",
    payment: "貨到付款",
    status: "備貨中",
    items: [
      { name: "香蕉", spec: "一箱 / 約13kg", qty: 2, price: 520 },
      { name: "芭樂", spec: "一箱 / 約20kg", qty: 1, price: 680 },
    ],
    note: "下午 3 點後可收貨",
  },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getOrderTotal(order) {
  return order.items.reduce((sum, item) => sum + item.qty * item.price, 0);
}

function getOrderQty(order) {
  return order.items.reduce((sum, item) => sum + item.qty, 0);
}

function assertCartMath() {
  const sampleItems = [
    { price: 120, qty: 2 },
    { price: 90, qty: 3 },
    { price: 520, qty: 1 },
  ];
  const totalQty = sampleItems.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = sampleItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const sampleOrderTotal = getOrderTotal({ items: sampleItems });

  console.assert(totalQty === 6, "cart quantity test failed");
  console.assert(totalAmount === 1030, "cart amount test failed");
  console.assert(sampleOrderTotal === 1030, "order amount test failed");
  console.assert(formatCurrency(1030) === "NT$1,030", "currency format test failed");
  console.assert(juiceSlides.length >= 3, "juice carousel slides test failed");
  console.assert(fruitSlides.length >= 3, "fruit carousel slides test failed");
}

if (typeof window !== "undefined") {
  assertCartMath();
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ children, className = "" }) {
  return <div className={cx("rounded-3xl border bg-white/85 shadow-sm backdrop-blur", className)}>{children}</div>;
}

function PrimaryButton({ children, className = "", disabled = false, onClick, type = "button" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, className = "", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50",
        className
      )}
    >
      {children}
    </button>
  );
}

export default function FruitJuiceWholesaleOrderPage() {
  const [route, setRoute] = useState(() => window.location.pathname);
  const [section, setSection] = useState(null);
  const [items, setItems] = useState([...initialJuiceItems, ...initialFruitItems]);
  const [orders, setOrders] = useState(sampleOrders);
  const [quantities, setQuantities] = useState({});
  const [checkout, setCheckout] = useState(false);
  const [payment, setPayment] = useState("cash");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const juiceItems = items.filter((item) => item.category === "juice" && item.active);
  const fruitItems = items.filter((item) => item.category === "fruit" && item.active);

  const sectionConfig = {
    juice: {
      title: "果汁專區",
      subtitle: "100%純天然，無加水、無加糖，適合餐飲店家與團購批發。",
      emoji: "💧",
      pageBg: "bg-gradient-to-br from-cyan-50 via-emerald-50 to-white",
      chip: "bg-cyan-50 text-cyan-700 border-cyan-100",
      accentText: "text-cyan-700",
      button: "bg-cyan-600 hover:bg-cyan-700",
      soft: "bg-cyan-100 text-cyan-700",
      items: juiceItems,
    },
    fruit: {
      title: "水果專區",
      subtitle: "新鮮、自然、健康，批發採購更好搭配。",
      emoji: "🍎",
      pageBg: "bg-gradient-to-br from-lime-50 via-orange-50 to-white",
      chip: "bg-lime-50 text-lime-700 border-lime-100",
      accentText: "text-lime-700",
      button: "bg-lime-600 hover:bg-lime-700",
      soft: "bg-lime-100 text-lime-700",
      items: fruitItems,
    },
  };

  const current = section ? sectionConfig[section] : null;

  const selectedItems = useMemo(() => {
    return items
      .map((item) => ({ ...item, qty: quantities[item.id] || 0 }))
      .filter((item) => item.qty > 0);
  }, [items, quantities]);

  const totalQty = selectedItems.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  function updateQty(id, change) {
    setQuantities((prev) => {
      const nextQty = Math.max((prev[id] || 0) + change, 0);
      return { ...prev, [id]: nextQty };
    });
  }

  function setQty(id, value) {
    const number = Math.floor(Number(value));
    setQuantities((prev) => ({ ...prev, [id]: Number.isFinite(number) && number > 0 ? number : 0 }));
  }

  function removeItem(id) {
    setQuantities((prev) => ({ ...prev, [id]: 0 }));
  }

  function clearCart() {
    setQuantities({});
    setCheckout(false);
  }

  function goHome() {
    setSection(null);
    setCheckout(false);
  }

  function navigateTo(path) {
    window.history.pushState({}, "", path);
    setRoute(path);
    setSection(null);
    setCheckout(false);
  }

  function goStore() {
    navigateTo("/");
  }

  function submitOrder(orderData) {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toLocaleString("zh-TW", { hour12: false }),
      customerName: orderData.customerName || "未填寫",
      phone: orderData.phone || "未填寫",
      address: orderData.address || "未填寫",
      payment: payment === "transfer" ? "匯款付款" : "貨到付款",
      status: "待確認",
      items: selectedItems.map((item) => ({ name: item.name, spec: item.spec, qty: item.qty, price: item.price })),
      note: orderData.note || "",
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setSection(null);
    alert("訂單已送出，後台可以看到這筆訂單。這是前端示範版，正式上線需接資料庫。水果不會自己送到，但訂單會乖乖排隊。🍊");
  }

  const isAdminRoute = route.startsWith("/admin");

  useEffect(() => {
    function handlePopState() {
      setRoute(window.location.pathname);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (isAdminRoute) {
    return (
      <AdminApp
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
        goStore={goStore}
        orders={orders}
        setOrders={setOrders}
        items={items}
        setItems={setItems}
      />
    );
  }

  return (
    <div className={cx("min-h-screen text-slate-800", current ? current.pageBg : "bg-gradient-to-br from-green-50 via-white to-orange-50")}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="雷盟堂 Logo"
              className="h-20 w-20 rounded-3xl bg-black object-contain p-2 shadow-sm"
            />
            <div>
              <p className="mb-2 inline-flex items-center rounded-full border border-green-100 bg-white/70 px-3 py-1 text-sm text-green-700 shadow-sm backdrop-blur">
                Lei Meng Tang
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">雷盟堂</h1>
              <p className="mt-2 max-w-2xl text-slate-600">簡單選品、即時加總，結帳時再填寫訂購資料。</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Card className="border-white/70">
              <div className="flex items-center gap-3 p-4">
                <div className="rounded-2xl bg-green-50 p-3 text-xl text-green-700">🛒</div>
                <div>
                  <p className="text-sm text-slate-500">目前選擇</p>
                  <p className="font-semibold text-slate-900">{totalQty} 項 / {formatCurrency(totalAmount)}</p>
                </div>
              </div>
            </Card>

          </div>
        </header>

        {!section && (
          <main className="grid gap-5 md:grid-cols-2">
            <SectionEntry
              title="果汁專區"
              subtitle="100%純天然果汁，無加水、無加糖，適合飲料店、餐飲、團購採購。"
              emoji="💧"
              className="border-cyan-100 bg-gradient-to-br from-cyan-50 to-white"
              iconClass="bg-cyan-100 text-cyan-700"
              buttonClass="bg-cyan-600 hover:bg-cyan-700"
              onClick={() => setSection("juice")}
              iconSlides={juiceSlides}
            />
            <SectionEntry
              title="水果專區"
              subtitle="新鮮自然的批發水果，適合店家備貨、活動、零售搭配。"
              emoji="🍎"
              className="border-lime-100 bg-gradient-to-br from-lime-50 to-orange-50"
              iconClass="bg-lime-100 text-lime-700"
              buttonClass="bg-lime-600 hover:bg-lime-700"
              onClick={() => setSection("fruit")}
              iconSlides={fruitSlides}
            />

            <Card className="border-white/70 md:col-span-2">
              <div className="p-5">
                {!checkout ? (
                  <>
                    <CartSummary
                      selectedItems={selectedItems}
                      totalAmount={totalAmount}
                      totalQty={totalQty}
                      onClear={clearCart}
                      onIncrease={(id) => updateQty(id, 1)}
                      onDecrease={(id) => updateQty(id, -1)}
                      onSetQty={(id, value) => setQty(id, value)}
                      onRemove={(id) => removeItem(id)}
                      compact
                    />
                    <PrimaryButton
                      className="mt-5 w-full bg-slate-900 py-4 text-base hover:bg-slate-800 sm:w-auto"
                      disabled={selectedItems.length === 0}
                      onClick={() => setCheckout(true)}
                    >
                      前往結帳
                    </PrimaryButton>
                    <p className="mt-3 text-xs font-medium text-slate-500">可直接在首頁結帳，也可以進入專區繼續加購。</p>
                  </>
                ) : (
                  <div className="mx-auto max-w-xl">
                    <CheckoutForm
                      selectedItems={selectedItems}
                      totalAmount={totalAmount}
                      payment={payment}
                      setPayment={setPayment}
                      buttonClass="bg-slate-900 hover:bg-slate-800"
                      onBack={() => setCheckout(false)}
                      onSubmit={submitOrder}
                    />
                  </div>
                )}
              </div>
            </Card>
          </main>
        )}

        {section && current && (
          <main className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <div className="space-y-5">
              <div className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className={cx("rounded-3xl p-4 text-3xl", current.soft)}>{current.emoji}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{current.title}</h2>
                    <p className="mt-1 text-slate-600">{current.subtitle}</p>
                    {section === "juice" && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">100%純天然</span>
                        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-800">無加水</span>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">無加糖</span>
                      </div>
                    )}
                  </div>
                </div>
                <GhostButton onClick={goHome}>← 回首頁</GhostButton>
              </div>

              {section === "juice" && <JuicePureNotice />}

              <div className="grid gap-4">
                {current.items.map((item) => (
                  <ProductItemCard
                    key={item.id}
                    item={item}
                    current={current}
                    quantity={quantities[item.id] || ""}
                    onDecrease={() => updateQty(item.id, -1)}
                    onIncrease={() => updateQty(item.id, 1)}
                    onSetQty={(value) => setQty(item.id, value)}
                  />
                ))}
              </div>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
              <Card className="border-white/70">
                <div className="p-5">
                  {!checkout ? (
                    <>
                      <CartSummary
                        selectedItems={selectedItems}
                        totalAmount={totalAmount}
                        totalQty={totalQty}
                        onClear={clearCart}
                        onIncrease={(id) => updateQty(id, 1)}
                        onDecrease={(id) => updateQty(id, -1)}
                        onSetQty={(id, value) => setQty(id, value)}
                        onRemove={(id) => removeItem(id)}
                      />
                      <PrimaryButton
                        className={cx("mt-5 w-full py-4 text-base", current.button)}
                        disabled={selectedItems.length === 0}
                        onClick={() => setCheckout(true)}
                      >
                        前往結帳
                      </PrimaryButton>
                      <p className="mt-3 text-center text-xs text-slate-500">訂購人資料會在結帳後填寫。</p>
                    </>
                  ) : (
                    <CheckoutForm
                      selectedItems={selectedItems}
                      totalAmount={totalAmount}
                      payment={payment}
                      setPayment={setPayment}
                      buttonClass={current.button}
                      onBack={() => setCheckout(false)}
                      onSubmit={submitOrder}
                    />
                  )}
                </div>
              </Card>
            </aside>
          </main>
        )}
      </div>
    </div>
  );
}

function JuicePureNotice() {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-cyan-50 to-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black text-emerald-700">OUR PROMISE</p>
          <h3 className="mt-1 text-2xl font-black text-slate-900">100%純天然果汁</h3>
          <p className="mt-2 text-sm font-bold text-slate-600">無加水、無加糖，保留水果原本的香氣與風味。</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-black sm:min-w-[260px]">
          <div className="rounded-2xl bg-white p-3 text-emerald-700 shadow-sm">純天然</div>
          <div className="rounded-2xl bg-white p-3 text-cyan-700 shadow-sm">無加水</div>
          <div className="rounded-2xl bg-white p-3 text-amber-700 shadow-sm">無加糖</div>
        </div>
      </div>
    </div>
  );
}

function ProductItemCard({ item, current, quantity, onDecrease, onIncrease, onSetQty }) {
  return (
    <Card className="group overflow-hidden border-white/70 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid gap-4 p-4 sm:grid-cols-[170px_1fr_auto] sm:items-center">
        <div className="relative h-56 overflow-hidden rounded-3xl bg-white sm:h-44">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-contain p-1 transition duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl">{item.category === "juice" ? "🥤" : "🍎"}</div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-3 sm:hidden">
            <p className="text-lg font-black text-white drop-shadow-sm">{item.name}</p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="hidden text-xl font-black text-slate-900 sm:block">{item.name}</h3>
            <span className={cx("rounded-full border px-3 py-1 text-xs font-bold", current.chip)}>{item.spec}</span>
          </div>
          <p className="text-sm font-medium leading-6 text-slate-600">{item.note}</p>
          <p className={cx("mt-3 text-2xl font-black", current.accentText)}>{formatCurrency(item.price)}</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white/80 p-3 shadow-sm sm:min-w-[156px]">
          <p className="mb-2 text-center text-xs font-bold text-slate-500">訂購數量</p>
          <div className="flex items-center justify-center gap-3">
            <GhostButton className="h-11 w-11 rounded-full px-0 py-0 text-lg" onClick={onDecrease}>-</GhostButton>
            <input
              aria-label={`${item.name} 數量`}
              className="h-11 w-16 rounded-2xl border border-slate-200 bg-white text-center font-bold outline-none focus:border-slate-400"
              type="number"
              min="0"
              value={quantity}
              placeholder="0"
              onChange={(event) => onSetQty(event.target.value)}
            />
            <PrimaryButton className={cx("h-11 w-11 rounded-full px-0 py-0 text-lg", current.button)} onClick={onIncrease}>+</PrimaryButton>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SectionEntry({ title, subtitle, emoji, className, iconClass, buttonClass, onClick, iconSlides }) {
  return (
    <Card className={cx("overflow-hidden transition hover:-translate-y-1 hover:shadow-md", className)}>
      <div className={cx("flex flex-col justify-between p-7", iconSlides ? "min-h-[500px]" : "min-h-[280px]")}>
        <div>
          {iconSlides ? (
            <JuiceIconCarousel slides={iconSlides} iconClass={iconClass} />
          ) : (
            <div className={cx("mb-5 inline-flex rounded-3xl p-4 text-4xl", iconClass)}>{emoji}</div>
          )}
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="mt-3 leading-7 text-slate-600">{subtitle}</p>
        </div>
        <PrimaryButton className={cx("mt-8 py-4 text-base", buttonClass)} onClick={onClick}>
          進入{title}
        </PrimaryButton>
      </div>
    </Card>
  );
}

function JuiceIconCarousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <div className="mb-5">
      <div className="overflow-hidden rounded-[28px]">
        <div className="relative h-[320px] w-full overflow-hidden rounded-[28px] bg-slate-100">
          {activeSlide.image ? (
            <>
              <img
                src={activeSlide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="relative z-10 h-full w-full object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </>
          ) : null}
          {activeSlide.emoji && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 text-7xl">
              {activeSlide.emoji}
            </div>
          )}

          </div>

        <div className="px-2 pt-3">
          <h4 className="text-xl font-black text-slate-900">
            {activeSlide.title}
          </h4>
          <p className="mt-1 text-sm font-bold text-slate-600">
            {activeSlide.subtitle}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`切換到第 ${index + 1} 張`}
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex(index);
              }}
              className={cx(
                "h-2 rounded-full transition-all",
                activeIndex === index ? "w-8 bg-cyan-600" : "w-2 bg-cyan-200 hover:bg-cyan-300"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function JuiceEntryCarousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-cyan-100 bg-white/80 p-3 shadow-sm">
      <div className={cx("relative min-h-[150px] overflow-hidden rounded-2xl bg-gradient-to-br p-4 transition-all duration-500", activeSlide.bg)}>
        {activeSlide.image ? (
          <img src={activeSlide.image} alt={activeSlide.title} className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className={cx("absolute inset-0", activeSlide.image ? "bg-black/25" : "bg-white/10")} />
        <div className="relative z-10 flex min-h-[118px] flex-col justify-end">
          <div className="mb-2 text-5xl drop-shadow-sm">{activeSlide.emoji}</div>
          <h4 className={cx("text-lg font-black", activeSlide.image ? "text-white" : "text-slate-900")}>{activeSlide.title}</h4>
          <p className={cx("mt-1 text-xs font-bold", activeSlide.image ? "text-white" : "text-slate-700")}>{activeSlide.subtitle}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`切換到第 ${index + 1} 張`}
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex(index);
            }}
            className={cx(
              "h-2 rounded-full transition-all",
              activeIndex === index ? "w-7 bg-cyan-600" : "w-2 bg-cyan-200 hover:bg-cyan-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function JuiceImageCarousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }

  const activeSlide = slides[activeIndex];

  return (
    <div className="overflow-hidden rounded-3xl border border-cyan-100 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">果汁形象展示</h3>
          <p className="text-sm font-medium text-slate-600">可放 3～5 張果汁照片，自動輪播。</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="rounded-full border border-cyan-200 bg-white px-3 py-2 font-bold text-cyan-700 hover:bg-cyan-50" onClick={goPrev}>‹</button>
          <button type="button" className="rounded-full border border-cyan-200 bg-white px-3 py-2 font-bold text-cyan-700 hover:bg-cyan-50" onClick={goNext}>›</button>
        </div>
      </div>

      <div className={cx("relative min-h-[220px] overflow-hidden rounded-3xl bg-gradient-to-br p-6 transition-all duration-500", activeSlide.bg)}>
        {activeSlide.image ? (
          <img src={activeSlide.image} alt={activeSlide.title} className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className={cx("absolute inset-0", activeSlide.image ? "bg-black/25" : "bg-white/10")} />
        <div className="relative z-10 flex min-h-[172px] flex-col justify-end">
          <div className="mb-4 text-6xl drop-shadow-sm">{activeSlide.emoji}</div>
          <h4 className={cx("text-2xl font-black", activeSlide.image ? "text-white" : "text-slate-900")}>{activeSlide.title}</h4>
          <p className={cx("mt-2 max-w-xl text-sm font-bold", activeSlide.image ? "text-white" : "text-slate-700")}>{activeSlide.subtitle}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`切換到第 ${index + 1} 張`}
            onClick={() => setActiveIndex(index)}
            className={cx(
              "h-3 rounded-full transition-all",
              activeIndex === index ? "w-8 bg-cyan-600" : "w-3 bg-cyan-200 hover:bg-cyan-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function CartSummary({ selectedItems, totalAmount, totalQty, onClear, onIncrease, onDecrease, onSetQty, onRemove, compact = false }) {
  const canAdjust = Boolean(onIncrease && onDecrease && onSetQty);
  const canRemove = Boolean(onRemove);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900">已選細項與加總</h3>
          <p className="text-sm text-slate-500">每個品項都可以在明細內直接調整數量。</p>
        </div>
        {selectedItems.length > 0 && (
          <button type="button" className="rounded-xl px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100" onClick={onClear}>
            🗑 清空
          </button>
        )}
      </div>

      {selectedItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-5 text-center text-sm text-slate-500">
          目前尚未選擇任何品項
        </div>
      ) : (
        <div className="space-y-3">
          {selectedItems.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white/80 p-3 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.spec} × {item.qty}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">單價 {formatCurrency(item.price)}</p>
                </div>
                <p className="shrink-0 font-semibold text-slate-900">{formatCurrency(item.price * item.qty)}</p>
              </div>

              {canAdjust && (
                <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-slate-50 p-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">調整數量</span>
                    {canRemove && (
                      <button
                        type="button"
                        className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-100"
                        onClick={() => onRemove(item.id)}
                      >
                        移除品項
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-bold text-slate-700 hover:bg-slate-100"
                      onClick={() => onDecrease(item.id)}
                    >
                      -
                    </button>
                    <input
                      aria-label={`${item.name} 明細數量`}
                      className="h-9 w-14 rounded-xl border border-slate-200 bg-white text-center text-sm font-bold text-slate-900 outline-none focus:border-slate-400"
                      type="number"
                      min="0"
                      value={item.qty}
                      onChange={(event) => onSetQty(item.id, event.target.value)}
                    />
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900 bg-slate-900 text-lg font-bold text-white hover:bg-slate-700"
                      onClick={() => onIncrease(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 rounded-2xl bg-slate-900 p-4 text-white">
            <div className="flex justify-between text-sm text-slate-300">
              <span>總數量</span>
              <span>{totalQty}</span>
            </div>
            <div className="mt-2 flex justify-between text-xl font-bold">
              <span>總金額</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>
          {compact && <p className="text-xs text-slate-500">可直接在明細調整，也可以進入專區繼續加購。</p>}
        </div>
      )}
    </div>
  );
}

function CheckoutForm({ selectedItems, totalAmount, payment, setPayment, buttonClass, onBack, onSubmit }) {
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", note: "" });
  const showBankInfo = payment === "transfer";

  function updateForm(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-green-50 p-3 text-xl text-green-700">✅</div>
        <div>
          <h3 className="font-bold text-slate-900">結帳資料</h3>
          <p className="text-sm text-slate-500">請填寫訂購人資訊。</p>
        </div>
      </div>

      <div className="mb-5 rounded-2xl bg-slate-50 p-4">
        <p className="mb-2 text-sm font-semibold text-slate-700">本次訂單</p>
        <div className="space-y-2 text-sm text-slate-600">
          {selectedItems.map((item) => (
            <div key={item.id} className="flex justify-between gap-3">
              <span>{item.name} × {item.qty}</span>
              <span>{formatCurrency(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 font-bold text-slate-900">
          <span>總金額</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
        <TextInput emoji="👤" label="訂購人 / 店名" placeholder="請輸入姓名或店名" value={form.customerName} onChange={(value) => updateForm("customerName", value)} />
        <TextInput emoji="📞" label="聯絡電話" placeholder="請輸入手機或市話" value={form.phone} onChange={(value) => updateForm("phone", value)} />
        <TextInput emoji="📍" label="配送地址" placeholder="請輸入配送地址" value={form.address} onChange={(value) => updateForm("address", value)} />

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">付款方式</label>
          <div className="grid gap-2">
            <PaymentOption checked={payment === "cash"} onClick={() => setPayment("cash")} title="貨到付款" />
            <PaymentOption checked={payment === "transfer"} onClick={() => setPayment("transfer")} title="匯款付款" />
          </div>
        </div>

        {showBankInfo && (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <div className="mb-2 font-bold">💳 匯款資訊</div>
            <p>匯款資訊待確認後提供。</p>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">備註</label>
          <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-slate-400">
            <span className="mt-1">💬</span>
            <textarea
              className="min-h-[88px] flex-1 resize-none bg-transparent text-sm outline-none"
              placeholder="例如：希望配送時間、是否需要發票、品項備註"
              value={form.note}
              onChange={(event) => updateForm("note", event.target.value)}
            />
          </div>
        </div>

        <PrimaryButton className={cx("w-full py-4 text-base", buttonClass)} type="submit">送出訂單</PrimaryButton>
        <GhostButton className="w-full" onClick={onBack}>返回修改品項</GhostButton>
      </form>
    </div>
  );
}

function TextInput({ emoji, label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-slate-400">
        <span>{emoji}</span>
        <input className="flex-1 bg-transparent text-sm outline-none" placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </div>
  );
}

function PaymentOption({ checked, onClick, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition",
        checked ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
      )}
    >
      <span>{title}</span>
      <span className={cx("h-3 w-3 rounded-full", checked ? "bg-white" : "bg-slate-200")} />
    </button>
  );
}

function AdminApp({ isAdminLoggedIn, setIsAdminLoggedIn, goStore, orders, setOrders, items, setItems }) {
  const [loginForm, setLoginForm] = useState({ account: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("orders");

  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await fetch("/api/me");
        const result = await response.json();

        if (response.ok && result.ok) {
          setIsAdminLoggedIn(true);
        }
      } catch (error) {
        setIsAdminLoggedIn(false);
      }
    }

    checkLogin();
  }, [setIsAdminLoggedIn]);

  async function login(event) {
    event.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginForm.account,
          password: loginForm.password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setLoginError(result.message || "帳號或密碼錯誤，請重新輸入。");
        return;
      }

      setIsAdminLoggedIn(true);
      setLoginError("");
    } catch (error) {
      setLoginError("登入失敗，請稍後再試。");
    }
  }

  async function logout() {
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      setIsAdminLoggedIn(false);
    }
  }

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8 text-black">
        <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-sm items-center">
          <div className="w-full rounded-3xl border border-slate-300 bg-white p-6 shadow-lg">
            <button className="mb-6 rounded-xl border border-slate-300 px-3 py-2 text-sm font-bold text-black hover:bg-slate-100" onClick={goStore}>← 回前台</button>

            <div className="mb-5 flex items-center gap-3">
              <img src="/logo.png" alt="雷盟堂 Logo" className="h-16 w-16 rounded-2xl bg-black object-contain p-2" />
              <div>
                <h2 className="text-2xl font-bold text-black">雷盟堂後台</h2>
                <p className="text-sm font-bold text-slate-700">Lei Meng Tang Admin</p>
              </div>
            </div>
            <p className="mb-6 text-sm font-bold text-slate-700">請輸入帳號密碼登入</p>

            <form className="space-y-4" onSubmit={login}>
              <div>
                <label className="mb-2 block text-sm font-bold text-black">帳號</label>
                <input
                  className="w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-base font-bold text-black outline-none placeholder:text-slate-500 focus:border-black"
                  placeholder="請輸入帳號"
                  value={loginForm.account}
                  onChange={(event) => setLoginForm((prev) => ({ ...prev, account: event.target.value }))}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-black">密碼</label>
                <input
                  className="w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 text-base font-bold text-black outline-none placeholder:text-slate-500 focus:border-black"
                  type="password"
                  placeholder="請輸入密碼"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                />
              </div>

              {loginError && <p className="rounded-2xl border border-red-300 bg-red-50 p-3 text-sm font-bold text-red-800">{loginError}</p>}

              <button type="submit" className="w-full rounded-2xl bg-black py-3 text-base font-bold text-white hover:bg-slate-800">
                登入後台
              </button>
            </form>

            <div className="mt-5 rounded-2xl border border-slate-300 bg-slate-50 p-3 text-sm font-bold text-black">
              後台僅供管理人員使用。<br />
              請勿將帳號密碼提供給非相關人員。
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalSales = orders.reduce((sum, order) => sum + getOrderTotal(order), 0);
  const pendingOrders = orders.filter((order) => order.status === "待確認").length;
  const activeItems = items.filter((item) => item.active).length;

  return (
    <div className="min-h-screen bg-slate-100 text-black">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <header className="mb-6 rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="雷盟堂 Logo" className="h-14 w-14 rounded-2xl bg-black object-contain p-2" />
                <div>
                  <h1 className="text-2xl font-bold text-black">雷盟堂後台</h1>
                  <p className="mt-1 text-sm font-bold text-slate-700">白底黑字管理頁</p>
                </div>
              </div>
              <p className="mt-1 text-sm font-bold text-slate-700">白底黑字管理頁</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-2xl border border-slate-400 bg-white px-4 py-2 text-sm font-bold text-black hover:bg-slate-100" onClick={goStore}>回前台</button>
              <button className="rounded-2xl border border-slate-400 bg-white px-4 py-2 text-sm font-bold text-black hover:bg-slate-100" onClick={logout}>登出</button>
            </div>
          </div>
        </header>

        <div className="mb-6 grid gap-3 md:grid-cols-4">
          <AdminBox title="總訂單" value={`${orders.length} 筆`} />
          <AdminBox title="總銷售額" value={formatCurrency(totalSales)} />
          <AdminBox title="待確認" value={`${pendingOrders} 筆`} />
          <AdminBox title="上架品項" value={`${activeItems} 項`} />
        </div>

        <nav className="mb-6 flex flex-wrap gap-2 rounded-3xl border border-slate-300 bg-white p-3 shadow-sm">
          <OldTab active={tab === "orders"} onClick={() => setTab("orders")}>訂單管理</OldTab>
          <OldTab active={tab === "products"} onClick={() => setTab("products")}>品項管理</OldTab>
          <OldTab active={tab === "stats"} onClick={() => setTab("stats")}>統計分析</OldTab>
          <OldTab active={tab === "settings"} onClick={() => setTab("settings")}>後台設定</OldTab>
        </nav>

        {tab === "orders" && <OrdersPanel orders={orders} setOrders={setOrders} />}
        {tab === "products" && <ProductsPanel items={items} setItems={setItems} />}
        {tab === "stats" && <StatisticsPanel orders={orders} />}
        {tab === "settings" && <SettingsPanel />}
      </div>
    </div>
  );
}

function AdminBox({ title, value }) {
  return (
    <div className="rounded-3xl border border-slate-300 bg-white p-4 shadow-sm">
      <p className="text-sm font-bold text-slate-700">{title}</p>
      <p className="mt-2 text-2xl font-bold text-black">{value}</p>
    </div>
  );
}

function OldTab({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "rounded-2xl border px-4 py-2 text-sm font-bold transition",
        active ? "border-black bg-black text-white" : "border-slate-300 bg-white text-black hover:bg-slate-100"
      )}
    >
      {children}
    </button>
  );
}

function OrdersPanel({ orders, setOrders }) {
  const [filters, setFilters] = useState({ status: "all", payment: "all", keyword: "" });

  function updateStatus(id, status) {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  }

  function deleteOrder(id) {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  }

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters({ status: "all", payment: "all", keyword: "" });
  }

  const filteredOrders = orders.filter((order) => {
    const keyword = filters.keyword.trim().toLowerCase();
    const matchesStatus = filters.status === "all" || order.status === filters.status;
    const matchesPayment = filters.payment === "all" || order.payment === filters.payment;
    const searchableText = [
      order.id,
      order.createdAt,
      order.customerName,
      order.phone,
      order.address,
      order.payment,
      order.status,
      order.note,
      ...order.items.map((item) => `${item.name} ${item.spec}`),
    ]
      .join(" ")
      .toLowerCase();
    const matchesKeyword = !keyword || searchableText.includes(keyword);
    return matchesStatus && matchesPayment && matchesKeyword;
  });

  const filteredTotal = filteredOrders.reduce((sum, order) => sum + getOrderTotal(order), 0);
  const filteredQty = filteredOrders.reduce((sum, order) => sum + getOrderQty(order), 0);

  return (
    <section className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">訂單管理</h2>
          <p className="mt-1 text-sm font-bold text-slate-700">
            目前顯示 {filteredOrders.length} / {orders.length} 筆，篩選後金額 {formatCurrency(filteredTotal)}，數量 {filteredQty} 件
          </p>
        </div>
        <button className="rounded-2xl border border-slate-400 bg-white px-4 py-2 text-sm font-bold text-black hover:bg-slate-100" onClick={resetFilters}>
          清除篩選
        </button>
      </div>

      <div className="mb-5 grid gap-3 rounded-2xl border border-slate-300 bg-slate-50 p-4 md:grid-cols-[1fr_180px_180px_auto] md:items-end">
        <div>
          <label className="mb-2 block text-sm font-bold text-black">搜尋訂單</label>
          <input
            className="w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 font-bold text-black outline-none placeholder:text-slate-500"
            placeholder="搜尋訂單編號、客戶、電話、地址、品項、備註"
            value={filters.keyword}
            onChange={(event) => updateFilter("keyword", event.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-black">訂單狀態</label>
          <select
            className="w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 font-bold text-black outline-none"
            value={filters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
          >
            <option value="all">全部狀態</option>
            <option value="待確認">待確認</option>
            <option value="備貨中">備貨中</option>
            <option value="已出貨">已出貨</option>
            <option value="已完成">已完成</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-black">付款方式</label>
          <select
            className="w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 font-bold text-black outline-none"
            value={filters.payment}
            onChange={(event) => updateFilter("payment", event.target.value)}
          >
            <option value="all">全部付款</option>
            <option value="貨到付款">貨到付款</option>
            <option value="匯款付款">匯款付款</option>
          </select>
        </div>
        <div className="rounded-2xl bg-white p-3 text-sm font-bold text-black">
          篩選結果<br />
          <span className="text-lg">{filteredOrders.length} 筆</span>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center font-bold text-slate-700">
          沒有符合條件的訂單
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-300">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm text-black">
            <thead>
              <tr className="bg-slate-100 text-black">
                <th className="border-b border-r border-slate-300 p-3">訂單編號</th>
                <th className="border-b border-r border-slate-300 p-3">時間</th>
                <th className="border-b border-r border-slate-300 p-3">客戶</th>
                <th className="border-b border-r border-slate-300 p-3">電話</th>
                <th className="border-b border-r border-slate-300 p-3">地址</th>
                <th className="border-b border-r border-slate-300 p-3">品項</th>
                <th className="border-b border-r border-slate-300 p-3">金額</th>
                <th className="border-b border-r border-slate-300 p-3">狀態</th>
                <th className="border-b border-slate-300 p-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="align-top hover:bg-slate-50">
                  <td className="border-b border-r border-slate-200 p-3 font-bold">{order.id}</td>
                  <td className="border-b border-r border-slate-200 p-3 font-medium">{order.createdAt}</td>
                  <td className="border-b border-r border-slate-200 p-3 font-bold">{order.customerName}</td>
                  <td className="border-b border-r border-slate-200 p-3 font-medium">{order.phone}</td>
                  <td className="border-b border-r border-slate-200 p-3 font-medium">{order.address}</td>
                  <td className="border-b border-r border-slate-200 p-3 font-medium">
                    {order.items.map((item, index) => (
                      <div key={`${order.id}-${item.name}-${index}`}>{item.name} × {item.qty}</div>
                    ))}
                    {order.note && <div className="mt-2 rounded-xl bg-slate-100 p-2 text-black">備註：{order.note}</div>}
                    <div className="mt-2 text-slate-800">付款：{order.payment}</div>
                  </td>
                  <td className="border-b border-r border-slate-200 p-3 font-bold">{formatCurrency(getOrderTotal(order))}</td>
                  <td className="border-b border-r border-slate-200 p-3 font-bold">{order.status}</td>
                  <td className="border-b border-slate-200 p-3">
                    <div className="flex flex-col gap-2">
                      <select
                        className="rounded-xl border border-slate-400 bg-white px-3 py-2 font-bold text-black outline-none"
                        value={order.status}
                        onChange={(event) => updateStatus(order.id, event.target.value)}
                      >
                        <option>待確認</option>
                        <option>備貨中</option>
                        <option>已出貨</option>
                        <option>已完成</option>
                      </select>
                      <button className="rounded-xl border border-slate-400 bg-white px-3 py-2 font-bold text-black hover:bg-slate-100" onClick={() => deleteOrder(order.id)}>
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function StatisticsPanel({ orders }) {
  const totalSales = orders.reduce((sum, order) => sum + getOrderTotal(order), 0);
  const totalQty = orders.reduce((sum, order) => sum + getOrderQty(order), 0);
  const averageOrder = orders.length > 0 ? Math.round(totalSales / orders.length) : 0;

  const statusSummary = ["待確認", "備貨中", "已出貨", "已完成"].map((status) => {
    const matched = orders.filter((order) => order.status === status);
    return {
      status,
      count: matched.length,
      total: matched.reduce((sum, order) => sum + getOrderTotal(order), 0),
    };
  });

  const paymentSummary = ["貨到付款", "匯款付款"].map((payment) => {
    const matched = orders.filter((order) => order.payment === payment);
    return {
      payment,
      count: matched.length,
      total: matched.reduce((sum, order) => sum + getOrderTotal(order), 0),
    };
  });

  const productMap = orders.reduce((map, order) => {
    order.items.forEach((item) => {
      const current = map[item.name] || { name: item.name, qty: 0, total: 0 };
      current.qty += item.qty;
      current.total += item.qty * item.price;
      map[item.name] = current;
    });
    return map;
  }, {});

  const productRanking = Object.values(productMap).sort((a, b) => b.total - a.total);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-black">統計分析</h2>
        <div className="grid gap-3 md:grid-cols-4">
          <AdminBox title="總訂單數" value={`${orders.length} 筆`} />
          <AdminBox title="總銷售額" value={formatCurrency(totalSales)} />
          <AdminBox title="總銷售數量" value={`${totalQty} 件`} />
          <AdminBox title="平均訂單金額" value={formatCurrency(averageOrder)} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-black">依訂單狀態統計</h3>
          <div className="overflow-hidden rounded-2xl border border-slate-300">
            <table className="w-full border-collapse text-left text-sm text-black">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border-b border-r border-slate-300 p-3">狀態</th>
                  <th className="border-b border-r border-slate-300 p-3">筆數</th>
                  <th className="border-b border-slate-300 p-3">金額</th>
                </tr>
              </thead>
              <tbody>
                {statusSummary.map((row) => (
                  <tr key={row.status}>
                    <td className="border-b border-r border-slate-200 p-3 font-bold">{row.status}</td>
                    <td className="border-b border-r border-slate-200 p-3 font-bold">{row.count}</td>
                    <td className="border-b border-slate-200 p-3 font-bold">{formatCurrency(row.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-black">依付款方式統計</h3>
          <div className="overflow-hidden rounded-2xl border border-slate-300">
            <table className="w-full border-collapse text-left text-sm text-black">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border-b border-r border-slate-300 p-3">付款方式</th>
                  <th className="border-b border-r border-slate-300 p-3">筆數</th>
                  <th className="border-b border-slate-300 p-3">金額</th>
                </tr>
              </thead>
              <tbody>
                {paymentSummary.map((row) => (
                  <tr key={row.payment}>
                    <td className="border-b border-r border-slate-200 p-3 font-bold">{row.payment}</td>
                    <td className="border-b border-r border-slate-200 p-3 font-bold">{row.count}</td>
                    <td className="border-b border-slate-200 p-3 font-bold">{formatCurrency(row.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-black">品項銷售排行</h3>
        {productRanking.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center font-bold text-slate-700">
            目前尚無銷售資料
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-300">
            <table className="w-full border-collapse text-left text-sm text-black">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border-b border-r border-slate-300 p-3">排名</th>
                  <th className="border-b border-r border-slate-300 p-3">品項</th>
                  <th className="border-b border-r border-slate-300 p-3">銷售數量</th>
                  <th className="border-b border-slate-300 p-3">銷售金額</th>
                </tr>
              </thead>
              <tbody>
                {productRanking.map((item, index) => (
                  <tr key={item.name}>
                    <td className="border-b border-r border-slate-200 p-3 font-bold">{index + 1}</td>
                    <td className="border-b border-r border-slate-200 p-3 font-bold">{item.name}</td>
                    <td className="border-b border-r border-slate-200 p-3 font-bold">{item.qty}</td>
                    <td className="border-b border-slate-200 p-3 font-bold">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductsPanel({ items, setItems }) {
  const [draft, setDraft] = useState({ category: "juice", name: "", spec: "", price: "", note: "" });

  function updateItem(id, key, value) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: key === "price" ? Number(value) || 0 : value } : item)));
  }

  function toggleActive(id) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
  }

  function addItem(event) {
    event.preventDefault();
    if (!draft.name || !draft.spec || !draft.price) return;
    const newItem = {
      id: `${draft.category}-${Date.now()}`,
      category: draft.category,
      name: draft.name,
      spec: draft.spec,
      price: Number(draft.price) || 0,
      note: draft.note,
      active: true,
    };
    setItems((prev) => [newItem, ...prev]);
    setDraft({ category: "juice", name: "", spec: "", price: "", note: "" });
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-black">品項管理</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-300">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm text-black">
            <thead>
              <tr className="bg-slate-100 text-black">
                <th className="border-b border-r border-slate-300 p-3">分類</th>
                <th className="border-b border-r border-slate-300 p-3">品名</th>
                <th className="border-b border-r border-slate-300 p-3">規格</th>
                <th className="border-b border-r border-slate-300 p-3">價格</th>
                <th className="border-b border-r border-slate-300 p-3">說明</th>
                <th className="border-b border-slate-300 p-3">狀態</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="border-b border-r border-slate-200 p-3">
                    <select className="w-full rounded-xl border border-slate-400 bg-white px-3 py-2 font-bold text-black outline-none" value={item.category} onChange={(event) => updateItem(item.id, "category", event.target.value)}>
                      <option value="juice">果汁</option>
                      <option value="fruit">水果</option>
                    </select>
                  </td>
                  <td className="border-b border-r border-slate-200 p-3">
                    <input className="w-full rounded-xl border border-slate-400 bg-white px-3 py-2 font-bold text-black outline-none" value={item.name} onChange={(event) => updateItem(item.id, "name", event.target.value)} />
                  </td>
                  <td className="border-b border-r border-slate-200 p-3">
                    <input className="w-full rounded-xl border border-slate-400 bg-white px-3 py-2 font-bold text-black outline-none" value={item.spec} onChange={(event) => updateItem(item.id, "spec", event.target.value)} />
                  </td>
                  <td className="border-b border-r border-slate-200 p-3">
                    <input className="w-full rounded-xl border border-slate-400 bg-white px-3 py-2 font-bold text-black outline-none" type="number" value={item.price} onChange={(event) => updateItem(item.id, "price", event.target.value)} />
                  </td>
                  <td className="border-b border-r border-slate-200 p-3">
                    <input className="w-full rounded-xl border border-slate-400 bg-white px-3 py-2 font-bold text-black outline-none" value={item.note} onChange={(event) => updateItem(item.id, "note", event.target.value)} />
                  </td>
                  <td className="border-b border-slate-200 p-3">
                    <button className={cx("w-full rounded-xl border px-3 py-2 font-bold", item.active ? "border-emerald-700 bg-emerald-50 text-emerald-800" : "border-slate-400 bg-slate-100 text-slate-700")} onClick={() => toggleActive(item.id)}>
                      {item.active ? "上架中" : "已下架"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm lg:self-start">
        <h2 className="mb-4 text-xl font-bold text-black">新增品項</h2>
        <form className="space-y-3" onSubmit={addItem}>
          <select className="w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 font-bold text-black outline-none" value={draft.category} onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}>
            <option value="juice">果汁專區</option>
            <option value="fruit">水果專區</option>
          </select>
          <input className="w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 font-bold text-black outline-none placeholder:text-slate-500" placeholder="品項名稱" value={draft.name} onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))} />
          <input className="w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 font-bold text-black outline-none placeholder:text-slate-500" placeholder="規格，例如 750ml / 瓶" value={draft.spec} onChange={(event) => setDraft((prev) => ({ ...prev, spec: event.target.value }))} />
          <input className="w-full rounded-2xl border border-slate-400 bg-white px-4 py-3 font-bold text-black outline-none placeholder:text-slate-500" placeholder="價格" type="number" value={draft.price} onChange={(event) => setDraft((prev) => ({ ...prev, price: event.target.value }))} />
          <textarea className="min-h-[96px] w-full resize-none rounded-2xl border border-slate-400 bg-white px-4 py-3 font-bold text-black outline-none placeholder:text-slate-500" placeholder="品項說明" value={draft.note} onChange={(event) => setDraft((prev) => ({ ...prev, note: event.target.value }))} />
          <button type="submit" className="w-full rounded-2xl bg-black px-4 py-3 font-bold text-white hover:bg-slate-800">
            新增到前台
          </button>
        </form>
      </div>
    </section>
  );
}

function SettingsPanel() {
  return (
    <section className="rounded-3xl border border-slate-300 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-black">後台設定</h2>
      <div className="space-y-3 text-sm font-bold text-black">
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-4">
          登入方式：目前為前端暫時登入。正式營運建議改為後端驗證或 Vercel 保護。
        </div>
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-4">
          正式上線提醒：登入驗證、訂單保存、商品資料都需要接後端與資料庫。
        </div>
        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-4">
          可擴充：LINE 通知、Google Sheet 訂單同步、匯款末五碼、配送日期、訂單匯出 Excel。
        </div>
      </div>
    </section>
  );
}

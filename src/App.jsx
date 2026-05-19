import { useEffect, useMemo, useState } from "react";

const fallbackJuiceItems = [
  { id: "juice-sugarcane", category: "juice", name: "甘蔗汁", spec: "750ml / 瓶", price: 70, note: "天然清甜，清爽解膩", image: "/juice/sugarcane.jpg", active: true, sortOrder: 1 },
  { id: "juice-passion", category: "juice", name: "百香果汁（有籽）", spec: "750ml / 瓶", price: 120, note: "酸甜香氣明顯", image: "/juice/passionfruit.jpg", active: true, sortOrder: 2 },
  { id: "juice-guava", category: "juice", name: "芭樂汁", spec: "750ml / 瓶", price: 80, note: "口感滑順，果香溫和", image: "/juice/guava.jpg", active: true, sortOrder: 3 },
  { id: "juice-kumquat", category: "juice", name: "金桔汁", spec: "750ml / 瓶", price: 90, note: "清新微酸，提神爽口", image: "/juice/kumquat.jpg", active: true, sortOrder: 4 },
  { id: "juice-orange", category: "juice", name: "柳丁汁", spec: "750ml / 瓶", price: 80, note: "經典清甜，餐飲常備款", image: "/juice/orange-sea.jpg", active: true, sortOrder: 5 },
  { id: "juice-ponkan", category: "juice", name: "椪柑汁", spec: "750ml / 瓶", price: 100, note: "柑橘香氣飽滿", image: "/juice/ponkan.jpg", active: true, sortOrder: 6 },
  { id: "juice-mango", category: "juice", name: "愛文芒果汁", spec: "750ml / 瓶", price: 100, note: "香甜濃厚，熱帶風味明顯", image: "/juice/mango.jpg", active: true, sortOrder: 7 },
  { id: "juice-coconut", category: "juice", name: "椰子水", spec: "750ml / 瓶", price: 90, note: "清透甘甜，清爽解渴", image: "/juice/coconut.jpg", active: true, sortOrder: 8 },
  { id: "juice-grape", category: "juice", name: "葡萄汁", spec: "750ml / 瓶", price: 110, note: "果香濃郁，口感飽滿", image: "/juice/grape.jpg", active: true, sortOrder: 9 },
  { id: "juice-grapefruit", category: "juice", name: "葡萄柚汁（有果肉）", spec: "750ml / 瓶", price: 100, note: "微苦回甘，清爽有層次", image: "/juice/grapefruit.jpg", active: true, sortOrder: 10 },
  { id: "juice-pineapple", category: "juice", name: "鳳梨汁", spec: "750ml / 瓶", price: 100, note: "酸甜明亮，熱帶系人氣款", image: "/juice/pineapple.jpg", active: true, sortOrder: 11 },
  { id: "juice-ginger", category: "juice", name: "薑母汁", spec: "750ml / 瓶", price: 145, note: "暖口辛香，冬季推薦", image: "/juice/ginger.jpg", active: true, sortOrder: 12 },
  { id: "juice-lemon", category: "juice", name: "檸檬汁", spec: "750ml / 瓶", price: 100, note: "酸香俐落，調飲百搭", image: "/juice/lime.jpg", active: true, sortOrder: 13 },
];

const fallbackFruitItems = [
  { id: "fruit-banana", category: "fruit", name: "香蕉", spec: "箱 / 批", price: 0, note: "自然熟成，批發採購", image: "/fruit/banana.jpg", active: true, sortOrder: 1 },
  { id: "fruit-apple", category: "fruit", name: "蘋果", spec: "箱 / 批", price: 0, note: "清脆香甜，店家常備", image: "/fruit/apple.jpg", active: true, sortOrder: 2 },
  { id: "fruit-orange", category: "fruit", name: "柳丁", spec: "箱 / 批", price: 0, note: "新鮮多汁，餐飲適用", image: "/fruit/orange.jpg", active: true, sortOrder: 3 },
  { id: "fruit-guava", category: "fruit", name: "芭樂", spec: "箱 / 批", price: 0, note: "清爽高纖，健康天然", image: "/fruit/guava.jpg", active: true, sortOrder: 4 },
  { id: "fruit-watermelon", category: "fruit", name: "西瓜", spec: "箱 / 批", price: 0, note: "夏季主力，清甜消暑", image: "/fruit/watermelon.jpg", active: true, sortOrder: 5 },
];

const fallbackItems = [...fallbackJuiceItems, ...fallbackFruitItems];

const juiceSlides = [
  { title: "甘蔗汁", subtitle: "100%純天然｜無加水｜無加糖", image: "/juice/sugarcane.jpg" },
  { title: "百香果汁（有籽）", subtitle: "酸甜果香｜店家調飲｜穩定供應", image: "/juice/passionfruit.jpg" },
  { title: "芭樂汁", subtitle: "滑順濃郁｜清爽健康｜餐飲批發", image: "/juice/guava.jpg" },
  { title: "柳丁汁", subtitle: "經典清甜｜早餐店｜團購採購", image: "/juice/orange-sea.jpg" },
  { title: "愛文芒果汁", subtitle: "香甜濃厚｜熱帶果香｜人氣品項", image: "/juice/mango.jpg" },
  { title: "椰子水", subtitle: "清透甘甜｜天然清爽｜夏季推薦", image: "/juice/coconut.jpg" },
];

const fruitSlides = [
  { title: "香蕉", subtitle: "自然熟成｜批發採購｜穩定供貨", image: "/fruit/banana.jpg", emoji: "🍌" },
  { title: "蘋果", subtitle: "清脆香甜｜店家常備｜耐放好搭", image: "/fruit/apple.jpg", emoji: "🍎" },
  { title: "柳丁", subtitle: "新鮮多汁｜榨汁零售｜餐飲適用", image: "/fruit/orange.jpg", emoji: "🍊" },
  { title: "芭樂", subtitle: "清爽高纖｜健康天然｜團購熱門", image: "/fruit/guava.jpg", emoji: "🍐" },
  { title: "西瓜", subtitle: "夏季主力｜清甜消暑｜切盤果汁皆宜", image: "/fruit/watermelon.jpg", emoji: "🍉" },
];

function formatCurrency(value) {
  return `NT$${Number(value || 0).toLocaleString("zh-TW")}`;
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-2xl px-5 py-3 text-sm font-black text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[28px] border bg-white/85 shadow-sm backdrop-blur ${className}`}>{children}</div>;
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.pathname);
  const [items, setItems] = useState(fallbackItems);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState("");

  const [section, setSection] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [quantities, setQuantities] = useState({});
  const [orders, setOrders] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    async function loadStoreProducts() {
      setProductsLoading(true);
      setProductsError("");

      try {
        const response = await fetch("/api/products");
        const result = await response.json();

        if (!response.ok || !result.ok) {
          setProductsError(result.message || "商品讀取失敗");
          return;
        }

        if (Array.isArray(result.products) && result.products.length > 0) {
          setItems(result.products);
        }
      } catch (error) {
        setProductsError("商品讀取失敗，請稍後再試。");
      } finally {
        setProductsLoading(false);
      }
    }

    loadStoreProducts();
  }, []);

  useEffect(() => {
    function handlePopState() {
      setRoute(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const activeItems = useMemo(() => items.filter((item) => item.active !== false), [items]);

  const juiceItems = useMemo(
    () =>
      activeItems
        .filter((item) => item.category === "juice")
        .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0)),
    [activeItems]
  );

  const fruitItems = useMemo(
    () =>
      activeItems
        .filter((item) => item.category === "fruit")
        .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0)),
    [activeItems]
  );

  const selectedItems = useMemo(() => {
    return activeItems
      .map((item) => ({ ...item, qty: Number(quantities[item.id] || 0) }))
      .filter((item) => item.qty > 0);
  }, [activeItems, quantities]);

  const totalQty = selectedItems.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.qty * Number(item.price || 0), 0);

  function navigateTo(path) {
    window.history.pushState({}, "", path);
    setRoute(path);
    setSection(null);
    setCheckout(false);
  }

  function goStore() {
    navigateTo("/");
  }

  function updateQty(id, delta) {
    setQuantities((prev) => {
      const next = Math.max(0, Number(prev[id] || 0) + delta);
      return { ...prev, [id]: next };
    });
  }

  function setQty(id, value) {
    const number = Math.floor(Number(value));
    setQuantities((prev) => ({
      ...prev,
      [id]: Number.isFinite(number) && number > 0 ? number : 0,
    }));
  }

  function removeItem(id) {
    setQuantities((prev) => ({ ...prev, [id]: 0 }));
  }

  function clearCart() {
    setQuantities({});
    setCheckout(false);
  }

  async function submitOrder(orderData) {
    if (selectedItems.length === 0) {
      alert("請先選擇品項再送出訂單。");
      return;
    }

    const orderPayload = {
      customerName: orderData.customerName || "未填寫",
      phone: orderData.phone || "未填寫",
      address: orderData.address || "未填寫",
      payment: payment === "transfer" ? "匯款付款" : "貨到付款",
      note: orderData.note || "",
      items: selectedItems.map((item) => ({
        id: item.id,
        name: item.name,
        spec: item.spec,
        qty: item.qty,
        price: item.price,
        subtotal: item.qty * item.price,
      })),
      totalQty,
      totalAmount,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const responseText = await response.text();

      let result = {};
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch (error) {
        alert(`訂單送出失敗：伺服器回傳格式錯誤\n${responseText}`);
        return;
      }

      if (!response.ok || !result.ok) {
        alert(result.message || `訂單送出失敗，狀態碼：${response.status}`);
        return;
      }

      clearCart();
      setSection(null);
      alert("訂單已送出，感謝您的訂購！我們會盡快與您確認訂單內容與配送資訊。");
    } catch (error) {
      alert(`訂單送出失敗：${error.message}`);
    }
  }

  const isAdminRoute = route.startsWith("/admin");

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

  const currentItems = section === "juice" ? juiceItems : fruitItems;
  const sectionTheme =
    section === "juice"
      ? {
          title: "果汁專區",
          subtitle: "100%純天然果汁，無加水、無加糖，適合飲料店、餐飲、團購採購。",
          bg: "from-cyan-50 via-emerald-50 to-white",
          button: "bg-cyan-700 hover:bg-cyan-800",
        }
      : {
          title: "水果專區",
          subtitle: "新鮮自然的批發水果，適合店家備貨、活動、零售搭配。",
          bg: "from-lime-50 via-orange-50 to-white",
          button: "bg-lime-700 hover:bg-lime-800",
        };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${section ? sectionTheme.bg : "from-emerald-50 via-white to-orange-50"} px-4 py-6 text-slate-900`}>
      <div className="mx-auto max-w-6xl">
        {!section ? (
          <>
            <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img src="/logo.png" alt="雷盟堂 Logo" className="h-20 w-20 rounded-3xl bg-black object-contain p-2 shadow-sm" />
                <div>
                  <p className="mb-2 inline-flex items-center rounded-full border border-green-100 bg-white/70 px-3 py-1 text-sm font-bold text-green-700 shadow-sm backdrop-blur">
                    Lei Meng Tang
                  </p>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">雷盟堂</h1>
                  <p className="mt-2 max-w-2xl font-bold text-slate-600">簡單選品、即時加總，結帳時再填寫訂購資料。</p>
                </div>
              </div>

              <Card className="border-white/70 p-4">
                <p className="text-xs font-bold text-slate-500">目前選擇</p>
                <p className="text-lg font-black">{totalQty} 項 / {formatCurrency(totalAmount)}</p>
              </Card>
            </header>

            {productsLoading && (
              <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-black text-slate-600">
                商品資料讀取中...
              </div>
            )}

            {productsError && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-black text-red-700">
                {productsError}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <SectionEntry
                title="果汁專區"
                subtitle="100%純天然果汁，無加水、無加糖，適合飲料店、餐飲、團購採購。"
                buttonText="進入果汁專區"
                className="border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50"
                buttonClass="bg-cyan-700 hover:bg-cyan-800"
                slides={juiceSlides}
                onClick={() => setSection("juice")}
              />

              <SectionEntry
                title="水果專區"
                subtitle="新鮮自然的批發水果，適合店家備貨、活動、零售搭配。"
                buttonText="進入水果專區"
                className="border-lime-100 bg-gradient-to-br from-lime-50 to-orange-50"
                buttonClass="bg-lime-700 hover:bg-lime-800"
                slides={fruitSlides}
                onClick={() => setSection("fruit")}
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
            </div>
          </>
        ) : (
          <>
            <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <button className="mb-3 text-sm font-black text-slate-500 hover:text-slate-900" onClick={() => setSection(null)}>
                  ← 回首頁
                </button>
                <h1 className="text-3xl font-black">{sectionTheme.title}</h1>
                <p className="mt-2 max-w-2xl font-bold text-slate-600">{sectionTheme.subtitle}</p>
              </div>

              <Card className="border-white/70 p-4">
                <p className="text-xs font-bold text-slate-500">目前合計</p>
                <p className="text-lg font-black">{totalQty} 項 / {formatCurrency(totalAmount)}</p>
              </Card>
            </header>

            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {currentItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    qty={Number(quantities[item.id] || 0)}
                    onIncrease={() => updateQty(item.id, 1)}
                    onDecrease={() => updateQty(item.id, -1)}
                    onSetQty={(value) => setQty(item.id, value)}
                    buttonClass={sectionTheme.button}
                  />
                ))}
              </div>

              <div className="lg:sticky lg:top-5 lg:self-start">
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
                          className={`mt-5 w-full py-4 text-base ${sectionTheme.button}`}
                          disabled={selectedItems.length === 0}
                          onClick={() => setCheckout(true)}
                        >
                          前往結帳
                        </PrimaryButton>
                      </>
                    ) : (
                      <CheckoutForm
                        selectedItems={selectedItems}
                        totalAmount={totalAmount}
                        payment={payment}
                        setPayment={setPayment}
                        buttonClass={sectionTheme.button}
                        onBack={() => setCheckout(false)}
                        onSubmit={submitOrder}
                      />
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SectionEntry({ title, subtitle, buttonText, className, buttonClass, slides, onClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] || slides[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <Card className={`${className} p-5`}>
      <div className="mb-5">
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="mt-2 font-bold text-slate-600">{subtitle}</p>
      </div>

      <div className="overflow-hidden rounded-[28px]">
        <div className="relative h-[320px] w-full overflow-hidden rounded-[28px] bg-slate-100">
          {activeSlide.image ? (
            <>
              <img src={activeSlide.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl" />
              <img src={activeSlide.image} alt={activeSlide.title} className="relative z-10 h-full w-full object-contain" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-7xl">{activeSlide.emoji || "🍊"}</div>
          )}
        </div>

        <div className="px-2 pt-3">
          <h4 className="text-xl font-black text-slate-900">{activeSlide.title}</h4>
          <p className="mt-1 text-sm font-bold text-slate-600">{activeSlide.subtitle}</p>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={`${slide.title}-${index}`}
              type="button"
              className={`h-2 rounded-full transition ${index === activeIndex ? "w-8 bg-cyan-600" : "w-2 bg-cyan-200"}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`切換到 ${slide.title}`}
            />
          ))}
        </div>
      </div>

      <PrimaryButton className={`mt-5 w-full py-4 ${buttonClass}`} onClick={onClick}>
        {buttonText}
      </PrimaryButton>
    </Card>
  );
}

function ProductCard({ item, qty, onIncrease, onDecrease, onSetQty, buttonClass }) {
  return (
    <Card className="group overflow-hidden border-white/70">
      <div className="relative h-56 overflow-hidden rounded-3xl bg-white sm:h-44">
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-contain p-1 transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-bold text-slate-400">無圖片</div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-slate-900">{item.name}</h3>
            <p className="mt-1 text-sm font-bold text-slate-500">{item.spec}</p>
          </div>
          <p className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-sm font-black text-white">{formatCurrency(item.price)}</p>
        </div>

        {item.note && <p className="mt-3 min-h-[42px] text-sm font-bold text-slate-600">{item.note}</p>}

        <div className="mt-4 flex items-center justify-between gap-3">
          <QuantityControl qty={qty} onDecrease={onDecrease} onIncrease={onIncrease} onSetQty={onSetQty} />
          <PrimaryButton className={buttonClass} onClick={onIncrease}>
            加入
          </PrimaryButton>
        </div>
      </div>
    </Card>
  );
}

function QuantityControl({ qty, onDecrease, onIncrease, onSetQty }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-black text-slate-700 hover:bg-slate-100" onClick={onDecrease}>
        -
      </button>
      <input
        className="h-9 w-14 rounded-xl border border-slate-200 bg-white text-center text-sm font-black text-slate-900 outline-none focus:border-slate-400"
        type="number"
        min="0"
        value={qty}
        onChange={(event) => onSetQty(event.target.value)}
      />
      <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900 bg-slate-900 text-lg font-black text-white hover:bg-slate-700" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}

function CartSummary({ selectedItems, totalAmount, totalQty, onClear, onIncrease, onDecrease, onSetQty, onRemove, compact = false }) {
  const canAdjust = Boolean(onIncrease && onDecrease && onSetQty);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-slate-900">已選細項與加總</h3>
          <p className="text-sm font-bold text-slate-500">每個品項都可以在明細內直接調整數量。</p>
        </div>
        {selectedItems.length > 0 && (
          <button type="button" className="rounded-xl px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-100" onClick={onClear}>
            清空
          </button>
        )}
      </div>

      {selectedItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-5 text-center text-sm font-bold text-slate-500">目前尚未選擇任何品項</div>
      ) : (
        <div className="space-y-3">
          {selectedItems.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white/80 p-3 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-black text-slate-900">{item.name}</p>
                  <p className="text-xs font-bold text-slate-500">{item.spec} × {item.qty}</p>
                  <p className="mt-1 text-xs font-black text-slate-500">單價 {formatCurrency(item.price)}</p>
                </div>
                <p className="shrink-0 font-black text-slate-900">{formatCurrency(item.price * item.qty)}</p>
              </div>

              {canAdjust && (
                <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-slate-50 p-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-500">調整數量</span>
                    {onRemove && (
                      <button type="button" className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-black text-red-600 hover:bg-red-100" onClick={() => onRemove(item.id)}>
                        移除品項
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-black text-slate-700 hover:bg-slate-100" onClick={() => onDecrease(item.id)}>
                      -
                    </button>
                    <input
                      className="h-9 w-14 rounded-xl border border-slate-200 bg-white text-center text-sm font-black text-slate-900 outline-none focus:border-slate-400"
                      type="number"
                      min="0"
                      value={item.qty}
                      onChange={(event) => onSetQty(item.id, event.target.value)}
                    />
                    <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900 bg-slate-900 text-lg font-black text-white hover:bg-slate-700" onClick={() => onIncrease(item.id)}>
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
            <div className="mt-2 flex justify-between text-xl font-black">
              <span>總金額</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          {compact && <p className="text-xs font-bold text-slate-500">可直接在明細調整，也可以進入專區繼續加購。</p>}
        </div>
      )}
    </div>
  );
}

function CheckoutForm({ selectedItems, totalAmount, payment, setPayment, buttonClass, onBack, onSubmit }) {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    note: "",
  });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.customerName.trim() || !form.phone.trim() || !form.address.trim()) {
      alert("請填寫訂購人、電話與配送地址。");
      return;
    }

    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" className="mb-4 text-sm font-black text-slate-500 hover:text-slate-900" onClick={onBack}>
        ← 回明細
      </button>

      <h3 className="mb-4 text-xl font-black text-slate-900">結帳資料</h3>

      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-sm font-black text-slate-700">訂購人</span>
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-slate-400" value={form.customerName} onChange={(event) => updateField("customerName", event.target.value)} />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-black text-slate-700">電話</span>
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-slate-400" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-black text-slate-700">配送地址</span>
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-slate-400" value={form.address} onChange={(event) => updateField("address", event.target.value)} />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-black text-slate-700">付款方式</span>
          <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-slate-400" value={payment} onChange={(event) => setPayment(event.target.value)}>
            <option value="cod">貨到付款</option>
            <option value="transfer">匯款付款</option>
          </select>
        </label>

        {payment === "transfer" && (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold text-blue-900">
            <div className="mb-2 font-black">匯款資訊</div>
            <p>匯款資訊待確認後提供。</p>
          </div>
        )}

        <label className="block">
          <span className="mb-1 block text-sm font-black text-slate-700">備註</span>
          <textarea className="min-h-[90px] w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-slate-400" value={form.note} onChange={(event) => updateField("note", event.target.value)} />
        </label>
      </div>

      <div className="my-5 rounded-2xl bg-slate-50 p-4">
        <p className="mb-2 font-black">訂單確認</p>
        <div className="space-y-1 text-sm font-bold text-slate-600">
          {selectedItems.map((item) => (
            <div key={item.id} className="flex justify-between gap-3">
              <span>{item.name} × {item.qty}</span>
              <span>{formatCurrency(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-lg font-black">
          <span>總金額</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      <PrimaryButton className={`w-full py-4 text-base ${buttonClass}`}>送出訂單</PrimaryButton>
    </form>
  );
}

function AdminApp({ isAdminLoggedIn, setIsAdminLoggedIn, goStore, orders, setOrders, items, setItems }) {
  const [loginForm, setLoginForm] = useState({ account: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("orders");
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  async function loadOrders() {
    if (!isAdminLoggedIn) return;

    setOrdersLoading(true);
    setOrdersError("");

    try {
      const response = await fetch("/api/admin-orders");
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setOrdersError(result.message || "訂單讀取失敗");
        return;
      }

      setOrders(result.orders || []);
    } catch (error) {
      setOrdersError("訂單讀取失敗，請稍後再試。");
    } finally {
      setOrdersLoading(false);
    }
  }

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

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadOrders();
    }
  }, [isAdminLoggedIn]);

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
      <div className="min-h-screen bg-white px-4 py-10 text-black">
        <div className="mx-auto max-w-md rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
          <button className="mb-6 text-sm font-black text-slate-500 hover:text-black" onClick={goStore}>
            ← 回前台
          </button>

          <div className="mb-5 flex items-center gap-3">
            <img src="/logo.png" alt="雷盟堂 Logo" className="h-16 w-16 rounded-2xl bg-black object-contain p-2" />
            <div>
              <h1 className="text-2xl font-black text-black">雷盟堂後台</h1>
              <p className="text-sm font-black text-slate-700">Lei Meng Tang Admin</p>
            </div>
          </div>

          <form onSubmit={login} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-black text-slate-700">帳號</span>
              <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 font-bold text-black outline-none focus:border-black" value={loginForm.account} onChange={(event) => setLoginForm((prev) => ({ ...prev, account: event.target.value }))} />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-black text-slate-700">密碼</span>
              <input type="password" className="w-full rounded-2xl border border-slate-300 px-4 py-3 font-bold text-black outline-none focus:border-black" value={loginForm.password} onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))} />
            </label>

            {loginError && <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-black text-red-700">{loginError}</div>}

            <button className="w-full rounded-2xl bg-black px-5 py-3 font-black text-white hover:bg-slate-800">登入後台</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6 text-black">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="雷盟堂 Logo" className="h-14 w-14 rounded-2xl bg-black object-contain p-2" />
            <div>
              <h1 className="text-2xl font-black text-black">雷盟堂後台</h1>
              <p className="mt-1 text-sm font-black text-slate-700">訂單、統計、品項管理</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="rounded-2xl border border-slate-400 bg-white px-4 py-2 text-sm font-black text-black hover:bg-slate-100" onClick={goStore}>
              回前台
            </button>
            <button className="rounded-2xl border border-slate-400 bg-white px-4 py-2 text-sm font-black text-black hover:bg-slate-100" onClick={logout}>
              登出
            </button>
          </div>
        </header>

        <div className="mb-5 flex flex-wrap gap-2">
          {[
            ["orders", "訂單管理"],
            ["stats", "統計"],
            ["products", "品項設定"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={`rounded-2xl px-5 py-3 text-sm font-black ${
                tab === key ? "bg-black text-white" : "border border-slate-300 bg-white text-black hover:bg-slate-100"
              }`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <OrdersPanel
            orders={orders}
            setOrders={setOrders}
            loading={ordersLoading}
            error={ordersError}
            reloadOrders={loadOrders}
          />
        )}

        {tab === "stats" && <StatsPanel orders={orders} />}

        {tab === "products" && <ProductSettingsPanel items={items} setItems={setItems} />}
      </div>
    </div>
  );
}

function OrdersPanel({ orders, setOrders, loading, error, reloadOrders }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  async function updateStatus(id, status) {
    const originalOrders = orders;
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));

    try {
      const response = await fetch("/api/admin-orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderNo: id, status }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setOrders(originalOrders);
        alert(result.message || "訂單狀態更新失敗");
      }
    } catch (error) {
      setOrders(originalOrders);
      alert("訂單狀態更新失敗，請稍後再試。");
    }
  }

  async function deleteOrder(id) {
    if (!window.confirm("確定要刪除這筆訂單嗎？")) return;

    const originalOrders = orders;
    setOrders((prev) => prev.filter((order) => order.id !== id));

    try {
      const response = await fetch("/api/admin-orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderNo: id }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setOrders(originalOrders);
        alert(result.message || "訂單刪除失敗");
      }
    } catch (error) {
      setOrders(originalOrders);
      alert("訂單刪除失敗，請稍後再試。");
    }
  }

  const filteredOrders = orders.filter((order) => {
    const keyword = search.trim().toLowerCase();
    const matchKeyword =
      !keyword ||
      [order.id, order.customerName, order.phone, order.address, order.note]
        .join(" ")
        .toLowerCase()
        .includes(keyword) ||
      (order.items || []).some((item) => item.name?.toLowerCase().includes(keyword));

    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    const matchPayment = paymentFilter === "all" || order.payment === paymentFilter;

    return matchKeyword && matchStatus && matchPayment;
  });

  const totalQty = filteredOrders.reduce((sum, order) => sum + (order.items || []).reduce((itemSum, item) => itemSum + Number(item.qty || 0), 0), 0);
  const totalAmount = filteredOrders.reduce((sum, order) => sum + (order.items || []).reduce((itemSum, item) => itemSum + Number(item.qty || 0) * Number(item.price || 0), 0), 0);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-black">訂單管理</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="rounded-2xl border border-slate-400 bg-white px-4 py-2 text-sm font-black text-black hover:bg-slate-100" onClick={reloadOrders}>
              重新整理訂單
            </button>
          </div>
          <p className="mt-3 text-sm font-black text-slate-700">
            目前顯示 {filteredOrders.length} / {orders.length} 筆，篩選後金額 {formatCurrency(totalAmount)}，數量 {totalQty} 件
          </p>
        </div>

        <button className="rounded-2xl border border-slate-400 bg-white px-4 py-2 text-sm font-black text-black hover:bg-slate-100" onClick={() => { setSearch(""); setStatusFilter("all"); setPaymentFilter("all"); }}>
          清除篩選
        </button>
      </div>

      <div className="mb-5 grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_180px_180px_90px]">
        <label className="block">
          <span className="mb-1 block text-sm font-black text-slate-700">搜尋訂單</span>
          <input className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" placeholder="搜尋訂單編號、客戶、電話、地址、品項、備註" value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-black text-slate-700">訂單狀態</span>
          <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">全部狀態</option>
            <option value="待確認">待確認</option>
            <option value="備貨中">備貨中</option>
            <option value="已出貨">已出貨</option>
            <option value="已完成">已完成</option>
            <option value="已取消">已取消</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-black text-slate-700">付款方式</span>
          <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" value={paymentFilter} onChange={(event) => setPaymentFilter(event.target.value)}>
            <option value="all">全部付款</option>
            <option value="貨到付款">貨到付款</option>
            <option value="匯款付款">匯款付款</option>
          </select>
        </label>

        <div className="rounded-2xl bg-white p-3 text-center">
          <p className="text-sm font-black text-slate-500">篩選結果</p>
          <p className="text-xl font-black">{filteredOrders.length} 筆</p>
        </div>
      </div>

      {loading && <div className="mb-4 rounded-2xl border border-slate-300 bg-slate-50 p-4 text-center font-black text-slate-700">訂單讀取中...</div>}
      {error && <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-black text-red-700">{error}</div>}

      {filteredOrders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center font-black text-slate-600">沒有符合條件的訂單</div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const orderTotal = (order.items || []).reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0);

            return (
              <div key={order.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-black text-black">{order.id}</h3>
                    <p className="mt-1 text-sm font-bold text-slate-600">{order.createdAt}</p>
                    <p className="mt-2 font-black text-slate-900">{order.customerName}｜{order.phone}</p>
                    <p className="mt-1 text-sm font-bold text-slate-600">{order.address}</p>
                    {order.note && <p className="mt-1 text-sm font-bold text-amber-700">備註：{order.note}</p>}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <select className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-black" value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)}>
                      <option value="待確認">待確認</option>
                      <option value="備貨中">備貨中</option>
                      <option value="已出貨">已出貨</option>
                      <option value="已完成">已完成</option>
                      <option value="已取消">已取消</option>
                    </select>
                    <button className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-black text-red-700 hover:bg-red-100" onClick={() => deleteOrder(order.id)}>
                      刪除
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {(order.items || []).map((item, index) => (
                    <div key={`${order.id}-${item.id}-${index}`} className="flex justify-between gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-bold">
                      <span>{item.name} × {item.qty}｜{item.spec}</span>
                      <span>{formatCurrency(Number(item.qty || 0) * Number(item.price || 0))}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-black p-4 text-white">
                  <span className="font-black">付款：{order.payment}</span>
                  <span className="text-xl font-black">{formatCurrency(orderTotal)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatsPanel({ orders }) {
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalAmount = orders.reduce((sum, order) => sum + (order.items || []).reduce((itemSum, item) => itemSum + Number(item.qty || 0) * Number(item.price || 0), 0), 0);
    const totalQty = orders.reduce((sum, order) => sum + (order.items || []).reduce((itemSum, item) => itemSum + Number(item.qty || 0), 0), 0);

    const itemMap = new Map();
    orders.forEach((order) => {
      (order.items || []).forEach((item) => {
        const current = itemMap.get(item.name) || { name: item.name, qty: 0, amount: 0 };
        current.qty += Number(item.qty || 0);
        current.amount += Number(item.qty || 0) * Number(item.price || 0);
        itemMap.set(item.name, current);
      });
    });

    const topItems = Array.from(itemMap.values()).sort((a, b) => b.qty - a.qty).slice(0, 8);

    return { totalOrders, totalAmount, totalQty, topItems };
  }, [orders]);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-xl font-black text-black">統計</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm font-black text-slate-500">訂單數</p>
          <p className="mt-2 text-3xl font-black">{stats.totalOrders}</p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm font-black text-slate-500">總數量</p>
          <p className="mt-2 text-3xl font-black">{stats.totalQty}</p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm font-black text-slate-500">總金額</p>
          <p className="mt-2 text-3xl font-black">{formatCurrency(stats.totalAmount)}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-black">熱銷品項</h3>
        <div className="space-y-2">
          {stats.topItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center font-black text-slate-600">尚無統計資料</div>
          ) : (
            stats.topItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 font-bold">
                <span>{item.name}</span>
                <span>{item.qty} 件｜{formatCurrency(item.amount)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ProductSettingsPanel({ items, setItems }) {
  const emptyForm = {
    id: "",
    category: "juice",
    name: "",
    spec: "",
    price: 0,
    note: "",
    image: "",
    active: true,
    sortOrder: 0,
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadAdminProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin-products");
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(result.message || "品項讀取失敗");
        return;
      }

      setItems(result.products || []);
    } catch (error) {
      setError("品項讀取失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdminProducts();
  }, []);

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      id: item.id,
      category: item.category || "juice",
      name: item.name || "",
      spec: item.spec || "",
      price: Number(item.price || 0),
      note: item.note || "",
      image: item.image || "",
      active: Boolean(item.active),
      sortOrder: Number(item.sortOrder || 0),
    });
  }

  function resetForm() {
    setEditingId("");
    setForm(emptyForm);
  }

  async function saveProduct(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.spec.trim()) {
      alert("請填寫品項名稱與規格");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const method = editingId ? "PATCH" : "POST";

      const response = await fetch("/api/admin-products", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          id: editingId || form.id,
          price: Number(form.price || 0),
          sortOrder: Number(form.sortOrder || 0),
          active: Boolean(form.active),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message || "品項儲存失敗");
        return;
      }

      await loadAdminProducts();
      resetForm();
      alert("品項已儲存，前台重新整理後會同步更新。");
    } catch (error) {
      alert("品項儲存失敗，請稍後再試。");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id) {
    if (!window.confirm("確定要刪除這個品項嗎？")) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin-products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message || "品項刪除失敗");
        return;
      }

      await loadAdminProducts();
      if (editingId === id) resetForm();
    } catch (error) {
      alert("品項刪除失敗，請稍後再試。");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(item) {
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin-products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          active: !item.active,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        alert(result.message || "品項狀態更新失敗");
        return;
      }

      await loadAdminProducts();
    } catch (error) {
      alert("品項狀態更新失敗，請稍後再試。");
    } finally {
      setSaving(false);
    }
  }

  const filteredItems = items
    .filter((item) => filterCategory === "all" || item.category === filterCategory)
    .sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
    });

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 text-black shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-black">品項設定</h2>
          <p className="mt-1 text-sm font-black text-slate-700">這裡的品項會儲存到 Supabase，前台會同步讀取。</p>
        </div>

        <button type="button" className="rounded-2xl border border-slate-400 bg-white px-4 py-2 text-sm font-black text-black hover:bg-slate-100" onClick={loadAdminProducts}>
          重新整理品項
        </button>
      </div>

      {loading && <div className="mb-4 rounded-2xl border border-slate-300 bg-slate-50 p-4 text-center font-black text-slate-700">品項讀取中...</div>}
      {error && <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-black text-red-700">{error}</div>}

      <form onSubmit={saveProduct} className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-4 text-lg font-black text-slate-900">{editingId ? "編輯品項" : "新增品項"}</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-black text-slate-700">分類</span>
            <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}>
              <option value="juice">果汁</option>
              <option value="fruit">水果</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-black text-slate-700">品項 ID</span>
            <input className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black disabled:bg-slate-100 disabled:text-slate-500" placeholder="例如 juice-sugarcane" value={form.id} disabled={Boolean(editingId)} onChange={(event) => setForm((prev) => ({ ...prev, id: event.target.value }))} />
            <p className="mt-1 text-xs font-bold text-slate-500">新增時可自訂，例如 juice-new-product；編輯時不可修改 ID。</p>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-black text-slate-700">品項名稱</span>
            <input className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" placeholder="例如 甘蔗汁" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-black text-slate-700">規格</span>
            <input className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" placeholder="例如 750ml / 瓶" value={form.spec} onChange={(event) => setForm((prev) => ({ ...prev, spec: event.target.value }))} />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-black text-slate-700">價格</span>
            <input type="number" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-black text-slate-700">排序</span>
            <input type="number" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" value={form.sortOrder} onChange={(event) => setForm((prev) => ({ ...prev, sortOrder: event.target.value }))} />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-black text-slate-700">圖片路徑</span>
            <input className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" placeholder="/juice/sugarcane.jpg" value={form.image} onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))} />
            <p className="mt-1 text-xs font-bold text-slate-500">圖片要放在 public/juice 或 public/fruit 裡，這裡填網站路徑。</p>
          </label>

          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-black text-slate-700">介紹</span>
            <textarea className="min-h-[90px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold text-black" value={form.note} onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))} />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white p-4 font-black text-black">
            <input type="checkbox" checked={form.active} onChange={(event) => setForm((prev) => ({ ...prev, active: event.target.checked }))} />
            前台顯示此品項
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="submit" disabled={saving} className="rounded-2xl bg-black px-5 py-3 text-sm font-black text-white hover:bg-slate-800 disabled:opacity-50">
            {saving ? "儲存中..." : editingId ? "儲存修改" : "新增品項"}
          </button>

          {editingId && (
            <button type="button" className="rounded-2xl border border-slate-400 bg-white px-5 py-3 text-sm font-black text-black hover:bg-slate-100" onClick={resetForm}>
              取消編輯
            </button>
          )}
        </div>
      </form>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-sm font-black text-slate-700">篩選分類</span>
        <select className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-black" value={filterCategory} onChange={(event) => setFilterCategory(event.target.value)}>
          <option value="all">全部</option>
          <option value="juice">果汁</option>
          <option value="fruit">水果</option>
        </select>
      </div>

      <div className="grid gap-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[90px_1fr_auto]">
            <div className="h-24 overflow-hidden rounded-2xl bg-slate-100">
              {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-contain" /> : <div className="flex h-full items-center justify-center text-xs font-bold text-slate-400">無圖片</div>}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">{item.name}</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{item.category === "juice" ? "果汁" : "水果"}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${item.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {item.active ? "前台顯示" : "已停用"}
                </span>
              </div>

              <p className="mt-1 text-sm font-bold text-slate-600">{item.spec}</p>
              <p className="mt-1 text-sm font-bold text-slate-600">{item.note}</p>
              <p className="mt-2 text-lg font-black text-slate-900">NT${Number(item.price || 0).toLocaleString("zh-TW")}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">ID：{item.id}｜排序：{item.sortOrder}</p>
            </div>

            <div className="flex flex-row gap-2 md:flex-col">
              <button type="button" className="rounded-2xl border border-slate-400 bg-white px-4 py-2 text-sm font-black text-black hover:bg-slate-100" onClick={() => startEdit(item)}>
                編輯
              </button>

              <button type="button" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-black text-amber-700 hover:bg-amber-100" onClick={() => toggleActive(item)}>
                {item.active ? "停用" : "啟用"}
              </button>

              <button type="button" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-black text-red-700 hover:bg-red-100" onClick={() => deleteProduct(item.id)}>
                刪除
              </button>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center font-black text-slate-600">目前沒有品項</div>}
      </div>
    </div>
  );
}
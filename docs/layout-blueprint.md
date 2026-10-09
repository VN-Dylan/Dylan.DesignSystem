# Layout Blueprint

Thiết kế hệ thống layout cho Dylan Design System: bố cục rõ ràng, khoảng cách
giữa section và giữa component **đều và có quy luật**, phong cách **modern +
minimalism**.

Đi kèm [`layout-plan.md`](./layout-plan.md) (các giai đoạn thực thi). Mọi
component mới trong `packages/ui` vẫn theo [`RECIPE.md`](../RECIPE.md); token
theo [`DESIGN.md §4`](../DESIGN.md).

## 1. Vấn đề cần giải **quyết**

| # | Hiện trạng | Hệ quả |
| --- | --- | --- |
| 1 | Chỉ có `Container`, `Grid`, `Divider`; không có `Stack` / `Inline` / `Section` | Showcase lặp ~150 chỗ `flex … gap-*` và ~233 chỗ `space-y-*`, mỗi chỗ một giá trị |
| 2 | Không có token layout (spacing role, độ rộng nội dung, kích thước shell, gutter) | `260`/`72` (sidenav) hard-code trong `AppLayout`; `max-w-5xl/6xl/7xl` rải rác ≥ 10 chỗ |
| 3 | Component tự mang margin / padding lệch thang (`Divider my-4`, `Card px-5 py-4`) | Khoảng cách giữa các khối không đoán trước được |
| 4 | App shell nằm trong showcase (`AppLayout`, `BookingLayout`, `GalleryLayout`, `AuthLayout` mỗi cái một kiểu) | Người dùng thư viện phải tự dựng lại khung trang |
| 5 | Z-index lệch: `StickyRegion` 40, `GalleryLayout` `z-20`, `BookingLayout` `z-sticky` | Chồng lớp không nhất quán |

## 2. Nguyên tắc

1. **Parent sở hữu khoảng cách, child không có margin ngoài.** Component không
   tự đẩy hàng xóm; `Stack` / `Grid` / `Section` quyết định gap. (Sửa `Divider`.)
2. **Một thang duy nhất, nền 4px, nhịp 8px.** Chỉ dùng các bậc trong §3. Giá
   trị lẻ (`1.5`, `2.5`, `5`, `7`) là lỗi.
3. **Ba cấp khoảng cách theo vai trò, không theo số.** Viết `gap="base"` thay
   vì `gap-4`. Đổi nhịp toàn hệ thống chỉ sửa token.
4. **Khoảng trắng thay cho đường kẻ.** Chia vùng bằng space trước, hairline
   border sau, shadow chỉ cho lớp nổi (popover, dialog, hover).
5. **Một cột nội dung chính, độ rộng có giới hạn.** Prose tối đa `65ch`; trang
   mặc định `1200px`; không còn `max-w-*` tự do.
6. **Mobile-first, gutter co giãn.** Layout phải đúng ở 360px, LTR + RTL, light
   + dark (theo DESIGN.md).
7. **Token-first.** `check:tokens` giữ nguyên; thêm `check:spacing` (§7).

## 3. Thang khoảng cách

Dùng đúng key Tailwind sẵn có (nền 4px) nên không phá utility đang dùng, chỉ
**giới hạn tập được phép**:

| Key | px | Dùng cho |
| --- | --- | --- |
| `0` | 0 | reset |
| `1` | 4 | icon ↔ chữ sát nhau, badge |
| `2` | 8 | trong component (label ↔ input, nút cạnh nhau) |
| `3` | 12 | padding control nhỏ |
| `4` | 16 | padding control, **gap giữa component trong một khối** |
| `6` | 24 | **padding card**, gap giữa các card / nhóm |
| `8` | 32 | gap giữa nhóm lớn trong một section |
| `12` | 48 | section (mobile) |
| `16` | 64 | section (tablet) |
| `24` | 96 | section (desktop, hero) |

Cho phép thêm: `px` (1px, border), và `0.5` chỉ cho border/outline offset.
Cấm: `1.5 2.5 3.5 5 7 9 10 11` cho `p/m/gap/space`.

### Alias theo vai trò (CSS variable, thêm vào `@vn-dylan/tokens`)

| Token | Giá trị | Tailwind | Ý nghĩa |
| --- | --- | --- | --- |
| `--dyl-gap-tight` | 8px | `gap-tight` | trong component, icon + label, nhóm nút |
| `--dyl-gap-base` | 16px | `gap-base` | **giữa các component trong một khối** (mặc định của `Stack`) |
| `--dyl-gap-loose` | 24px | `gap-loose` | giữa card / nhóm trong grid |
| `--dyl-gap-group` | 32px | `gap-group` | giữa nhóm lớn trong một section |
| `--dyl-space-section` | `clamp(3rem, 2rem + 4vw, 6rem)` | `py-section` | **giữa các section** (48 → 96px, co giãn) |
| `--dyl-inset-card` | 24px | `p-card` | padding trong card / panel |
| `--dyl-gutter` | `clamp(1rem, 0.5rem + 2vw, 2rem)` | `px-gutter` | lề trái/phải của trang (16 → 32px) |

Quy tắc đọc nhanh: **8 trong component · 16 giữa component · 24 giữa card · 32
giữa nhóm · 48–96 giữa section.**

## 4. Token layout khác

| Token | Giá trị | Ghi chú |
| --- | --- | --- |
| `--dyl-content-prose` | `65ch` | bài đọc |
| `--dyl-content-narrow` | 640px | form, auth |
| `--dyl-content-default` | 1200px | trang chuẩn (thay `max-w-6xl/7xl`) |
| `--dyl-content-wide` | 1440px | dashboard, bảng rộng |
| `--dyl-sidenav-width` | 256px | thay `260` (về lưới 8px) |
| `--dyl-sidenav-collapsed` | 72px | giữ nguyên |
| `--dyl-header-height` | 64px | |
| Breakpoint | `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536` | giữ Tailwind mặc định, export thêm ra TS (`breakpoints`) |
| Z-index | giữ `dropdown 1000 … tooltip 1060` | `StickyRegion` mặc định chuyển sang `z-sticky`; cấm `z-20`, `z-40` literal |

## 5. Phong cách modern + minimalism

| Yếu tố | Quy định |
| --- | --- |
| Bề mặt | Phẳng. Nền trang `bg-bg`, khối nổi `bg-surface` + `border-border` 1px. `shadow-sm` mặc định chỉ cho khối tương tác, `shadow-md/lg` chỉ cho lớp nổi |
| Phân tách | Space → hairline → tonal (`bg-surface-sunken`). Không dùng đường kẻ đậm, không viền kép |
| Bo góc | Card/panel `rounded-lg`, control `rounded-md`, avatar/pill `full` (không trộn thêm bậc) |
| Màu | Một màu nhấn (primary) cho hành động chính; còn lại trung tính. Màu trạng thái chỉ khi có nghĩa |
| Chữ | Tối đa 3 cấp trên một màn hình: tiêu đề trang, tiêu đề section, nội dung. Heading dùng `font-semibold`, không nhiều weight |
| Mật độ | Thoáng mặc định; chế độ `compact` (chỉ bảng/danh sách) giảm một bậc, không đổi thang |
| Chuyển động | `duration-fast/base` + `ease-standard`; tôn trọng `prefers-reduced-motion` |

## 6. Primitive layout (trong `@vn-dylan/ui`)

Tất cả theo RECIPE: `forwardRef`, `data-*` cho biến thể, `classNames`, `asElement`
nếu render được thẻ khác, story + test (kèm axe), export từ `index.ts`.

| Component | API chính | Ghi chú |
| --- | --- | --- |
| `Stack` | `gap` (`tight\|base\|loose\|group` hoặc key thang), `align`, `justify`, `divider?`, `asElement` | Cột dọc; mặc định `gap="base"` |
| `Inline` | như `Stack` + `wrap` | Hàng ngang; thay `flex items-center gap-*` |
| `Grid` (nâng cấp) | `columns` (số hoặc `{ base, sm, md, lg }`), `minChildWidth` (auto-fit), `gap`; `Grid.Item` với `span` | Bỏ class demo `dyl-grid__item*` khỏi SCSS lõi, chuyển vào story |
| `Container` (nâng cấp) | `size` (`prose\|narrow\|default\|wide\|full`), `gutter` (bool, mặc định true), `asElement` | Thay mọi `max-w-*` tự do |
| `Section` | `spacing` (`base\|loose\|none`), `tone` (`default\|subtle`), bọc `Container` tuỳ chọn | Cung cấp `py-section`; `tone="subtle"` = nền `surface-sunken` |
| `PageHeader` | `title`, `description`, `actions`, `breadcrumb`, `back` | Tiêu đề trang chuẩn, gap theo token |
| `Card` (sửa) | `padding` (`default\|compact`) → `p-card` (24) / `p-4` (16) | Thay `px-5 py-4` |
| `Divider` (sửa) | `spacing` (`none\|tight\|base`, mặc định `base` = 16px như cũ), `label?` | Không còn margin cứng; `none` dùng trong flex/toolbar |
| `Center`, `Spacer`, `AspectRatio` | đơn giản | Spacer = `flex: 1` hoặc khoảng cố định theo thang |
| `AppShell` (compound) | `AppShell.Sidebar / Header / Main / Footer`; `sidebarCollapsed`, `onMobileNavChange` | Desktop: sidebar sticky; dưới `lg`: Drawer. Dùng token `sidenav-*`, `header-height` |
| Hooks | `useMediaQuery(query)`, `useBreakpoint()` (SSR-safe) | `useLayout` (gắn auth/theme) vẫn ở showcase |

### Cách Stack/Grid thực thi gap (không literal)

`<Stack gap="loose">` render `data-gap="loose"`; SCSS: `.dyl-stack { gap: var(--dyl-stack-gap, var(--dyl-gap-base)); }`
với `[data-gap='loose'] { --dyl-stack-gap: var(--dyl-gap-loose) }`. Gap theo key
thang số dùng cùng cơ chế (`data-gap="6"` → `var(--dyl-space-6)`), nên
`check:tokens` không bắt lỗi và đổi thang chỉ cần sửa token.

## 7. Cơ chế giữ nhịp (guardrails)

- **`pnpm check:spacing`** (script mới, cạnh `check-tokens.mjs`): quét
  `packages/ui/src/**/*.{scss,tsx}` và `apps/showcase/src/**/*.tsx`, báo lỗi với
  giá trị ngoài thang (`1.5 2.5 3.5 5 7 …`), `max-w-*` tự do ở `apps/showcase` (giới hạn nội bộ của overlay trong `packages/ui` được phép),
  và `z-<số>` literal. Escape hatch: `// ds-allow-spacing`.
- **Test cấu trúc**: mỗi primitive có test xác nhận `data-gap` → biến token đúng.
- **Visual snapshots**: cập nhật sau khi chuẩn hoá Card/Divider (đổi có chủ đích).
- **Handbook** `docs/handbook/Layout.mdx`: quy tắc §2–§5, bảng thang, ví dụ đúng/sai.

## 8. Anatomy trang chuẩn

```text
AppShell
├─ Sidebar (256 / 72)        sticky, full height
└─ column
   ├─ Header (64)            sticky, z-sticky, border-b
   ├─ Main                   p-gutter, fluid (no centred column)
   │  └─ (content directly; Container only for prose/form pages)
   │     ├─ PageHeader                       ┐ gap-group (32)
   │     ├─ Section / Stack gap=group        ┘
   │     │   ├─ Grid gap=loose (24)  →  Card (p-card 24)
   │     │   │                            └─ Stack gap=base (16) → controls (gap-tight 8)
   │     └─ Section (py-section 48→96)
   └─ Footer
```

Trang marketing/booking: `Section` nối tiếp `Section`; nền xen kẽ
`tone="default"` / `tone="subtle"`, không dùng divider giữa các section.

## 9. Ngoài phạm vi

- Đổi màu / brand / typography family.
- Tái thiết kế từng component (chỉ chỉnh khoảng cách để khớp thang).
- Layout engine kiểu masonry / virtualized.

## 10. Quyết định đã chốt

| Câu hỏi | Quyết định |
| --- | --- |
| Sidebar | **256px** (thu gọn 72px) |
| Padding card | **24px** (`p-card`) + biến thể `compact` = 16px cho bảng/danh sách dày |
| Độ rộng trang mặc định | **1200px** |
| Phạm vi showcase | **Toàn bộ showcase** chuyển sang primitive mới (kể cả gallery) |

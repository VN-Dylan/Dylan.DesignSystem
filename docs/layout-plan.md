# Layout Plan

Kế hoạch thực thi cho [`layout-blueprint.md`](./layout-blueprint.md): đưa Dylan
Design System từ "4 primitive mỏng" sang hệ thống layout có nhịp khoảng cách
thống nhất, phong cách modern + minimalism — **không phá consumer hiện có**.

Mọi component mới tuân [`RECIPE.md`](../RECIPE.md); token theo
[`DESIGN.md`](../DESIGN.md).

## Quyết định đã chốt

| Topic | Đề xuất | Hệ quả |
| --- | --- | --- |
| Thang spacing | Giữ key Tailwind nền 4px, giới hạn tập được phép (blueprint §3) | Không phá utility cũ; thêm alias vai trò |
| Sidebar | **256px** (thay 260) | Đổi nhỏ trong showcase |
| Padding card | **24px** (`p-card`) + `padding="compact"` = 16px | Đổi hiển thị → cập nhật visual snapshot |
| Độ rộng trang | **1200px** (`--dyl-content-default`) | Thay `max-w-6xl/7xl` |
| Phạm vi showcase | **Toàn bộ showcase** (cả gallery) | Diff lớn; chia PR theo nhóm view |
| Release | **minor** (thêm API; `Divider` giữ mặc định 16px) | Changeset như booking pack |

## Constraints

- Component dir: `<Name>.tsx / .scss / types.ts / index.ts / .stories.tsx / .test.tsx`; export từ `packages/ui/src/index.ts`.
- `forwardRef`, biến thể qua `data-*`, `classNames`; test kết thúc bằng `expect(await axe(container)).toHaveNoViolations()`.
- `check:tokens`: không literal màu / px / duration trong `src`.
- Thiết kế cho light + dark + RTL cùng lúc; kiểm ở 360px.
- Thay đổi hiển thị của component có sẵn là **có chủ đích** → ghi vào `docs/handbook/EyrisMapping.mdx`.

## Phases

### Phase 0 — Đo & chốt
- [x] Viết `scripts/check-spacing.mjs` ở chế độ **báo cáo** (không fail) để lấy baseline: số vi phạm ngoài thang, `max-w-*` tự do, `z-<số>` literal, theo từng file.
- [x] Chốt 4 quyết định (xem bảng trên).
- **Xong khi:** có số liệu baseline lưu trong PR description; quyết định được ghi vào bảng trên.

### Phase 1 — Token
- [x] `@vn-dylan/tokens`: thêm `--dyl-gap-{tight,base,loose,group}`, `--dyl-space-section`, `--dyl-inset-card`, `--dyl-gutter`, `--dyl-content-*`, `--dyl-sidenav-*`, `--dyl-header-height` (light/dark không đổi, brand-booking không đè).
- [x] `tailwind-preset.ts`: map `gap-tight|base|loose|group`, `py-section`, `p-card`, `px-gutter`, `maxWidth` (`prose|narrow|content|wide`), `screens` giữ mặc định; export `breakpoints` ra TS.
- [x] `preset-theme-schema.test.ts` / test token: bảo đảm biến mới có trong CSS sinh ra.
- [x] `DESIGN.md §4`: thêm bảng "Spacing & layout".
- **Xong khi:** `pnpm build`, `check:tokens`, test tokens xanh; chưa component nào đổi hiển thị.

### Phase 2 — Primitive
Song song được (không phụ thuộc nhau, đều chỉ dùng token Phase 1):
- [ ] **`Stack`** + **`Inline`** (dùng chung SCSS gap qua `data-gap`).
- [ ] **`Grid`** nâng cấp: `columns` responsive, `minChildWidth`, `gap`, `Grid.Item span`; chuyển `dyl-grid__item*` sang story-only.
- [ ] **`Container`** nâng cấp: `size`, `gutter`; giữ hành vi cũ khi không truyền prop.
- [ ] **`Section`** (+ `tone`), **`PageHeader`**, **`Center`**, **`Spacer`**, **`AspectRatio`**.
- [ ] **`Card`**: thêm `padding` (`default|compact`), dùng `p-card` / `p-4`.
- [ ] **`Divider`**: thêm `spacing` (`none|tight|base`, mặc định `base` = 16px như cũ) và `label`.
- [ ] `useMediaQuery`, `useBreakpoint` (SSR-safe, test với `matchMedia` mock).
- **Xong khi:** mỗi component có story (mọi biến thể + RTL), test + axe, export; `check:api` xanh.

### Phase 3 — AppShell
- [ ] `AppShell` compound (`Sidebar / Header / Main / Footer`), sidebar sticky, thu gọn 72px, dưới `lg` dùng `Drawer` sẵn có; đóng khi đổi route do consumer điều khiển qua prop.
- [ ] Hợp nhất `StickyRegion` z-index về token `z-sticky`.
- [ ] Story: shell đầy đủ (desktop / collapsed / mobile) + test hành vi (toggle, drawer, focus trap, axe).
- **Xong khi:** shell render đúng ở 360 / 768 / 1280, LTR + RTL, light + dark.

### Phase 4 — Chuẩn hoá component hiện có
- [ ] Chạy `check-spacing` ở chế độ fail cho `packages/ui`; sửa vi phạm (ưu tiên các `gap-1.5`, `p-2.5`, `py-3.5`…).
- [ ] Bỏ margin ngoài còn sót trong component (parent sở hữu gap).
- [ ] Cập nhật visual snapshot (`pnpm test:storybook:visual:update`) và review diff từng ảnh; ghi thay đổi vào `EyrisMapping.mdx`.
- **Xong khi:** `check:spacing` = 0 vi phạm trong `packages/ui`; không còn margin ngoài; snapshot đã được duyệt.

### Phase 5 — Showcase
- [ ] `AppLayout` → `AppShell`; `BlankLayout`, `AuthLayout`, `BookingLayout`, `GalleryLayout` dùng `Container` / `Section` / `Stack`.
- [ ] Landing blocks (`LandingSection`, `HeroSection`, `FeatureGrid`, `StatsBand`…) và `components/marketing/*` dùng `Section` xen kẽ tone, bỏ divider giữa section.
- [ ] Gallery (`GalleryLayout`, `sections/*`, `Demo`, `SectionShell`) và các view còn lại chuyển sang `Container` / `Stack` / `Inline` / `Grid`; chia PR theo nhóm: shell+auth → landing+marketing → booking → gallery.
- [ ] Thay toàn bộ `max-w-*` rải rác và `flex … gap-*` / `space-y-*` lặp trong `apps/showcase/src`.
- [ ] Bật `check:spacing` fail cho toàn bộ `apps/showcase/src` (không allow-list).
- **Xong khi:** mọi route showcase khớp nhịp §3; `check:spacing` = 0 vi phạm trong `apps/showcase/src`.

### Phase 6 — Docs & release
- [ ] `docs/handbook/Layout.mdx`: nguyên tắc, thang, ví dụ đúng/sai, anatomy trang, bảng "khi nào dùng Stack / Inline / Grid / Section".
- [ ] `WhenToUseWhat.mdx`: thêm mục layout; `PROGRESS.md`: ghi giai đoạn.
- [ ] CI: thêm `check:spacing` vào workflow `ci.yml`.
- [ ] Changeset (minor) cho `@vn-dylan/ui` và `@vn-dylan/tokens`; ghi rõ thay đổi hiển thị của `Card`.
- **Xong khi:** full suite xanh; changeset sẵn sàng cho workflow release.

## Sequencing

| Order | Work | Song song |
| --- | --- | --- |
| 1 | Phase 0: baseline + chốt quyết định | — |
| 2 | Phase 1: token + preset | — |
| 3 | Phase 2: `Stack`‖`Inline`‖`Grid`‖`Container`‖`Section`+`PageHeader`‖`Divider`‖hooks | có |
| 4 | Phase 3: `AppShell` (cần `Container`, hooks) ‖ Phase 4 (cần token) | có |
| 5 | Phase 5: showcase (cần 2, 3, 4) | một phần |
| 6 | Phase 6: docs + CI + release | tuần tự |

Ước lượng: ~11–15 person-days (~7–9 nếu chạy song song Phase 2 và Phase 3‖4).

## Verify gate

Mỗi component (Phase 2–3):

```
pnpm --filter @vn-dylan/ui exec tsc -b
pnpm exec eslint packages/ui/src/<Name>
pnpm exec prettier --check packages/ui/src/<Name>
pnpm exec vitest run packages/ui/src/<Name>
pnpm --filter @vn-dylan/ui exec vite build
```

Toàn đợt (cuối Phase 4 và Phase 6): `pnpm lint && pnpm typecheck && pnpm test &&
pnpm check:tokens && pnpm check:spacing && pnpm check:api && pnpm build &&
pnpm storybook:build && pnpm test:storybook:visual`.

## Rủi ro

| Rủi ro | Giảm thiểu |
| --- | --- |
| Đổi padding Card / Divider làm lệch snapshot, layout của consumer | `Divider` giữ mặc định 16px; Card ghi chú trong changeset; duyệt từng ảnh snapshot |
| Snapshot sinh bởi font OS khác (PROGRESS.md đã ghi) | Chạy `visual:update` đúng môi trường CI; không merge ảnh sinh từ máy local khác OS |
| `Grid` đổi API làm vỡ story/consumer dùng class Tailwind trực tiếp | Giữ `className` hoạt động như cũ; `columns` là tuỳ chọn |
| Showcase quá lớn để chuyển hết một lượt | Chia PR theo nhóm view (Phase 5); mỗi PR chạy snapshot/visual riêng |
| Thang quá chặt gây khó chịu khi cần ngoại lệ | Escape hatch `// ds-allow-spacing` kèm lý do, review khi PR |

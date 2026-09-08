---
"@vn-dylan/ui": patch
"@vn-dylan/utils": patch
"@vn-dylan/icons": patch
---

Widen the React peer dependency range to `^18.2.0 || ^19.0.0` so the packages
install cleanly in React 19 projects. Test suite passes under React 19.

# How Tos

## How to remove scrollbar from react components

- Append to `app/globals.css`
- Then use the `no-scrollbar` along with `overflow-y-auto`

```css
@utility no-scrollbar {
  @apply [scrollbar-width:none] [&::-webkit-scrollbar]:hidden;
}
```

# DexScreener Integration Guide

## Overview
The DexScreener embed is now fully functional and will automatically load when a valid contract address is set.

## How It Works

### Automatic Loading
The DexScreener widget automatically loads when:
1. A valid Solana contract address is detected in the contract address field
2. The address is at least 32 characters (typical Solana base58 address length)
3. The address doesn't contain placeholder text like "TBD" or "Will be updated"

### Manual Loading
You can also manually load the widget by calling:
```javascript
window.loadDexScreenerWidget('YOUR_PAIR_ADDRESS_HERE');
```

### Theme Integration
The DexScreener iframe automatically syncs with your site's theme:
- When users toggle between light/dark mode, the chart theme updates accordingly
- Theme parameter is passed in the iframe URL: `theme=dark` or `theme=light`

## Implementation Details

### JavaScript Functions

#### `loadDexScreenerWidget(pairAddress)`
- **Purpose**: Loads the DexScreener trading chart iframe
- **Parameters**: 
  - `pairAddress` (string): The Solana pair address or contract address
- **Behavior**:
  - Creates an iframe with DexScreener embed URL
  - Sets appropriate theme based on current site theme
  - Hides the placeholder chart container
  - Shows the DexScreener embed container

#### `updateDexScreenerTheme()`
- **Purpose**: Updates the DexScreener iframe theme when site theme changes
- **Behavior**:
  - Finds the iframe by ID
  - Updates the `theme` parameter in the iframe URL
  - Reloads the iframe with the new theme

#### `checkAndLoadDexScreener()`
- **Purpose**: Automatically checks if a valid contract address exists and loads the widget
- **Behavior**:
  - Reads the contract address from the DOM
  - Validates the address format
  - Calls `loadDexScreenerWidget()` if valid

### HTML Structure

The price section contains two elements:
```html
<!-- Placeholder shown before liquidity exists -->
<div id="chart-container" class="chart-container">
    <p class="chart-placeholder">Chart will appear here once trading pair is live on Raydium.</p>
</div>

<!-- DexScreener embed (hidden by default) -->
<div id="dexscreener-embed" class="dexscreener-embed">
    <!-- Iframe will be injected here by JavaScript -->
</div>
```

### CSS Styling

The embed container is styled to:
- Be hidden by default (`display: none`)
- Center itself with max-width of 900px
- Apply theme-appropriate shadows and border radius
- Show hover effects for better interactivity

## Usage Examples

### Example 1: Set Contract Address to Auto-Load
Update the contract address in [`index.html`](index.html:235):
```html
<code id="contract-address" class="contract-address">
    YourSolanaContractAddressHere123456789
</code>
```

The widget will automatically load on page load.

### Example 2: Load with Specific Pair Address
If you want to use a specific pair address (e.g., DMVCAT-SOL pool address):
```javascript
// In the browser console or at the end of script.js:
window.loadDexScreenerWidget('YourPairAddressHere');
```

### Example 3: Load After Liquidity Event
If you want to load the chart only after a certain event:
```javascript
// After confirming liquidity pool exists
fetch('https://api.dexscreener.com/latest/dex/tokens/YOUR_TOKEN_ADDRESS')
    .then(response => response.json())
    .then(data => {
        if (data.pairs && data.pairs.length > 0) {
            // Use the first pair found
            window.loadDexScreenerWidget(data.pairs[0].pairAddress);
        }
    });
```

## DexScreener Embed Parameters

The current implementation uses:
- `embed=1`: Enable embed mode
- `theme=dark|light`: Match site theme
- `trades=0`: Hide trades panel (cleaner look)
- `info=0`: Hide info panel (focus on chart)

You can customize these in [`script.js`](script.js:308) by modifying the iframe src URL.

### Available Parameters
- `trades=1`: Show recent trades
- `info=1`: Show token information
- `theme=dark|light`: Color theme
- `chartType=candles|bars|line`: Chart display type
- `chartInterval=1|5|15|60|240|1D`: Time interval

## Testing

To test the integration:

1. **With a real contract address**: Update the contract address in the HTML to a valid Solana token address
2. **Manual test**: Open browser console and run:
   ```javascript
   window.loadDexScreenerWidget('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // USDC example
   ```
3. **Theme test**: Click the theme toggle button - the chart should update its theme

## Production Deployment

Before going live:

1. ✅ Verify the contract address is correct
2. ✅ Test the chart loads properly on both mobile and desktop
3. ✅ Confirm theme switching works correctly
4. ✅ Test with slow network connections (lazy loading is enabled)
5. ✅ Verify CORS and iframe permissions work on your domain

## Notes

- The widget uses the contract address as the pair address by default
- For better accuracy, you may want to use the actual liquidity pool pair address
- DexScreener automatically detects the chain (Solana in this case)
- The iframe has `allow="clipboard-write"` for copy functionality within the chart
- Lazy loading is enabled for better performance

## Support

If the chart doesn't load:
1. Check browser console for errors
2. Verify the contract/pair address is valid
3. Ensure the token has liquidity on a DEX supported by DexScreener
4. Check that DexScreener supports your token (new tokens may take time to index)

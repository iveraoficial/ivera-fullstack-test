npx valio \
    --ts-reference shared \
    --ts-extends tsconfig.base.json \
    --include "shared/**/*.ts" \
    --exclude "shared/database-types.ts" \
    -o ./schema

import { controller, get } from "../lib/decorator";
@controller("/api/v0/movies")
export class movieController {
    @get("/")
    movieList(ctx, next) {
        ctx.body = "拿到了电影列表"
    }
}
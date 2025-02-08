const METHODS_THAT_ALLOW_BODY = new Set(['POST', 'PUT', 'PATCH']);
const SUPPORTED_CONTENT_TYPES = new Set(['application/json']);

type RequestContext = {
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
};

export type ControllerContext<T extends RequestContext = RequestContext> = T;
export type ControllerRequest<Context> = Request & {
  context: Context;
};

function create<Context extends ControllerContext>(
  request: Request,
  context: Context,
) {
  type Handler = (
    request: ControllerRequest<Context>,
  ) => Promise<ControllerRequest<Context> | Response>;

  async function handle(...handlers: Array<Handler>) {
    context = {
      params: context.params ?? {},
      query: Object.fromEntries(new URL(request.url).searchParams),
      body: {},
    } as Context;

    if (METHODS_THAT_ALLOW_BODY.has(request.method)) {
      const contentType = request.headers.get('content-type');
      if (!contentType) {
        return Response.json(
          { message: 'O header "Content-Type" é obrigatório.' },
          { status: 400 },
        );
      }
      if (!SUPPORTED_CONTENT_TYPES.has(contentType)) {
        return Response.json(
          { message: 'O header "Content-Type" fornecido não é suportado.' },
          { status: 400 },
        );
      }
      try {
        context.body = await request.json();
      } catch (error) {
        console.error(error);
        return Response.json(
          { message: 'O "body" fornecido não é um JSON válido.' },
          { status: 400 },
        );
      }
    }

    try {
      for (const handler of handlers) {
        const handlerResult = await handler({ ...request, context });
        if (handlerResult instanceof Response) {
          return handlerResult;
        }
        request = handlerResult;
      }
    } catch (error) {
      console.error(error);
      return Response.json(
        { message: 'Ocorreu um erro interno no servidor.' },
        { status: 500 },
      );
    }
  }

  return Object.freeze({
    handle,
  });
}

export const controller = Object.freeze({
  create,
});

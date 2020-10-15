import pathlib
import pytest
from scrapy.http import HtmlResponse, Request
import betamax
from betamax import Betamax
from betamax.fixtures.pytest import _betamax_recorder
from requests import Session

# betamax配置，设置betamax录像带的存储位置
cassette_dir = pathlib.Path(__file__).parent.parent.parent / 'fixture' / 'cassettes'
cassette_dir.mkdir(parents=True, exist_ok=True)

with betamax.Betamax.configure() as config:
    config.cassette_library_dir = cassette_dir.resolve()
    config.preserve_exact_body_bytes = True

@pytest.fixture
def betamax_recorder(request):
    return _betamax_recorder(request, parametrized=True)

@pytest.fixture(autouse=False)
def resource_get(betamax_session):

    def get(url, *args, **kwargs):
        request = kwargs.pop('request', None)
        s = Session()
        with Betamax(s, cassette_library_dir=cassette_dir).use_cassette('betamax_cassettes', record='new_episodes'):
            r = s.get(url)
            selector = HtmlResponse(body=r.content, url=url, request=request)
            return selector
    return get

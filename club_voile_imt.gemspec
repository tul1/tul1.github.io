# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "club_voile_imt"
  spec.version       = "0.1.1"
  spec.authors       = ["Patricio Tula"]
  spec.email         = ["tula.patricio@gmail.com"]

  spec.summary       = %q{A minimal blue theme for Jekyll}
  spec.homepage      = "https://gitlab.com/tul1/club_voile_imt"
  spec.license       = "MIT"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 3.5"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end